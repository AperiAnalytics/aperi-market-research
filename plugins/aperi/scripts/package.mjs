#!/usr/bin/env node
/** Build reproducible plugin and marketplace ZIPs with Node standard libraries. */
import { lstat, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { deflateRawSync } from 'node:zlib';

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = resolve(pluginRoot, '../..');
const manifest = JSON.parse(await readFile(resolve(pluginRoot, 'plugin.json'), 'utf8'));
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name) || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
  throw new Error('A stable plugin name and semantic release version are required.');
}
const args = process.argv.slice(2);
if (args.length !== 0 && !(args.length === 2 && args[0] === '--output')) {
  throw new Error('Usage: node plugins/aperi/scripts/package.mjs [--output <directory>]');
}
const outputDirectory = resolve(args[1] ?? '.local/aperi-plugin-package');
if (outputDirectory === pluginRoot || outputDirectory.startsWith(pluginRoot + sep)) {
  throw new Error('Build output must stay outside the plugin package.');
}
await mkdir(outputDirectory, { recursive: true });

async function filesUnder(root, path) {
  const full = resolve(root, path);
  const contained = relative(root, full);
  if (isAbsolute(contained) || contained.split(sep).includes('..')) throw new Error('Path escapes package.');
  const stat = await lstat(full);
  if (stat.isSymbolicLink()) throw new Error('Symbolic links are not distributed: ' + path);
  if (stat.isDirectory()) {
    const children = await readdir(full);
    const result = [];
    for (const child of children.sort()) result.push(...await filesUnder(root, path + '/' + child));
    return result;
  }
  if (!stat.isFile()) throw new Error('Only ordinary files are distributed: ' + path);
  if (stat.size > 256 * 1024) throw new Error('Plugin file exceeds 256KiB: ' + path);
  return [{ path, data: await readFile(full) }];
}

const packageFiles = [];
for (const path of ['plugin.json', 'mcp.json', '.claude-plugin/plugin.json', '.mcp.json', 'README.md', 'LICENSE', 'skills', 'assets']) {
  packageFiles.push(...await filesUnder(pluginRoot, path));
}
packageFiles.sort((a, b) => a.path.localeCompare(b.path, 'en'));
const casefoldNames = new Set();
for (const entry of packageFiles) {
  if (casefoldNames.has(entry.path.toLowerCase())) throw new Error('Case-insensitive path collision: ' + entry.path);
  casefoldNames.add(entry.path.toLowerCase());
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit++) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
  return value >>> 0;
});
function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function zip(files) {
  const localRecords = [], centralRecords = [];
  let offset = 0;
  for (const file of files) {
    if (file.path.startsWith('/') || file.path.split('/').includes('..') || file.path.includes('\\')) {
      throw new Error('Unsafe ZIP member path: ' + file.path);
    }
    const name = Buffer.from(file.path, 'utf8');
    const compressed = deflateRawSync(file.data, { level: 9 });
    const crc = crc32(file.data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x800, 6); local.writeUInt16LE(8, 8); local.writeUInt16LE(33, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(file.data.length, 22); local.writeUInt16LE(name.length, 26);
    localRecords.push(local, name, compressed);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x800, 8); central.writeUInt16LE(8, 10); central.writeUInt16LE(33, 14);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(file.data.length, 24); central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42); centralRecords.push(central, name);
    offset += local.length + name.length + compressed.length;
  }
  const centralDirectory = Buffer.concat(centralRecords);
  const footer = Buffer.alloc(22);
  footer.writeUInt32LE(0x06054b50, 0); footer.writeUInt16LE(files.length, 8); footer.writeUInt16LE(files.length, 10);
  footer.writeUInt32LE(centralDirectory.length, 12); footer.writeUInt32LE(offset, 16);
  return Buffer.concat([...localRecords, centralDirectory, footer]);
}

const marketplaceFiles = packageFiles.map(entry => ({ path: 'plugins/aperi/' + entry.path, data: entry.data }));
for (const path of ['.agents/plugins/marketplace.json', '.claude-plugin/marketplace.json']) {
  const catalog = JSON.parse(await readFile(resolve(repositoryRoot, path), 'utf8'));
  const plugins = catalog.plugins.filter(entry => entry.name === manifest.name);
  if (plugins.length !== 1) throw new Error('Each catalog must declare this plugin exactly once.');
  marketplaceFiles.push({ path, data: Buffer.from(JSON.stringify({ ...catalog, plugins }, null, 2) + '\n') });
}
marketplaceFiles.sort((a, b) => a.path.localeCompare(b.path, 'en'));

const artifacts = [];
for (const [name, files] of [
  [manifest.name + '-' + manifest.version + '.zip', packageFiles],
  ['aperi-plugins-' + manifest.version + '.zip', marketplaceFiles]
]) {
  const data = zip(files);
  await writeFile(resolve(outputDirectory, name), data);
  artifacts.push({ name, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex'), files: files.length });
}
const receipt = {
  plugin: manifest.name, version: manifest.version, endpoint: 'https://mcp.aperi.io/mcp',
  formats: ['Agent Plugins 1.0.0', 'Claude Code compatibility'],
  authentication: 'none', publicDirectoryApproval: 'not-submitted', artifacts,
  files: packageFiles.map(file => ({ path: file.path, bytes: file.data.length, sha256: createHash('sha256').update(file.data).digest('hex') }))
};
await writeFile(resolve(outputDirectory, 'release-manifest.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ outputDirectory, ...receipt }, null, 2));
