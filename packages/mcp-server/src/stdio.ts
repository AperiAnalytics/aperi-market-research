#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { AperiPublicClient } from './client.ts';
import { createAperiServer } from './server.ts';

// This process reads one dedicated, optional read-only credential. No ambient
// cookies, wallet keys or financial signing material are forwarded.
try {
  const server = createAperiServer(new AperiPublicClient({marketKey:process.env.APERI_MARKET_API_KEY}));
  await server.connect(new StdioServerTransport());
} catch {
  console.error('Aperi MCP could not start. Check Node 24 and the optional read-only market key configuration.');
  process.exitCode = 1;
}
