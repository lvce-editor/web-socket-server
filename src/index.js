import { Buffer } from 'node:buffer'
import * as _ws from 'ws'

// workaround for jest or node bug
const WebSocketServer = _ws.WebSocketServer
  ? _ws.WebSocketServer
  : // @ts-ignore
    _ws.default.WebSocketServer

const webSocketServer = new WebSocketServer({
  noServer: true,

  // TODO not sure if ws compress is working at all
  // perMessageDeflate: true
})

export const handleUpgrade = (request, socket) => {
  const { promise, resolve } = Promise.withResolvers()
  webSocketServer.handleUpgrade(request, socket, Buffer.alloc(0), resolve)
  return promise
}
