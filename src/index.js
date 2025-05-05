import { Buffer } from 'node:buffer'

const createWebSocketServer = async () => {
  const _ws = await import('ws')
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
  return webSocketServer
}

const doSocketUpgrade = (webSocketServer, request, socket) => {
  const { promise, resolve } = Promise.withResolvers()
  webSocketServer.handleUpgrade(request, socket, Buffer.alloc(0), resolve)
  return promise
}

export const handleUpgrade = async (request, socket) => {
  const webSocketServer = await createWebSocketServer()
  const webSocket = await doSocketUpgrade(webSocketServer, request, socket)
  return webSocket
}
