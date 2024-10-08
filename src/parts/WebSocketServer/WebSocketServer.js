import { Buffer } from 'node:buffer'
import * as _ws from 'ws'
import * as IsSocket from '../IsSocket/IsSocket.js'
import * as Promises from '../Promises/Promises.js'

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
  if (!IsSocket.isSocket(socket)) {
    throw new TypeError(`socket must be of type Socket`)
  }
  const { promise, resolve } = Promises.withResolvers()
  webSocketServer.handleUpgrade(request, socket, Buffer.alloc(0), resolve)
  return promise
}
