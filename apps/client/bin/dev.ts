import path from 'node:path'
import liveServer from 'live-server'

const LIVE_SERVER_CONFIG = {
  port: 8080, // Set the server port. Defaults to 8080.
  host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: '.', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  // * Ignore sass files
  ignore: `${path.join('.', 'assets', 'styles', 'sass')}`, // comma-separated string for paths to ignore
  file: undefined, // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 100, // Waits for all changes, before reloading. Defaults to 0 ms.
  mount: [], // Mount a directory to a route.
  logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
  middleware: [] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}

console.info('\x1b[33m🔥 Starting up...\x1b[0m')

/**
 * ! Start the server for serving static files
 */
liveServer.start(LIVE_SERVER_CONFIG)

/**
 * Clean shutdown
 */
const cleanup = () => {
  console.info('\x1b[33m👋 Shutting down...\x1b[0m')
  liveServer.shutdown()
  console.info('\x1b[32mLive Server stopped\x1b[0m')
}

process.on('SIGTERM', cleanup)
process.on('SIGINT', cleanup)
