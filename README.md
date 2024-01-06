# Web Socket Server

Wrapper module for `ws` for use in Lvce Editor.

### Usage

```js
import * as WebSocketServer from "@lvce-editor/web-socket-server";

// receive request object and socket from a parent
// process and upgrade the socket to a websocket
await WebSocketServer.handleUpgrade(request, socket);
```
