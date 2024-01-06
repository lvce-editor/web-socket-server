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

const withResolvers = () => {
  /**
   * @type {any}
   */
  let _resolve
  /**
   * @type {any}
   */
  let _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return {
    resolve: _resolve,
    reject: _reject,
    promise,
  }
}

export const handleUpgrade = (request, socket) => {
  const { promise, resolve } = withResolvers()
  const upgradeCallback = (ws) => {
    resolve(ws)
  }
  webSocketServer.handleUpgrade(request, socket, Buffer.alloc(0), upgradeCallback)
  return promise
}
