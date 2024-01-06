import { jest } from "@jest/globals";

jest.unstable_mockModule("ws", () => {
  return {
    WebSocketServer: class {
      handleUpgrade(message, handle, buffer, callback) {
        callback({
          __isWebSocket: true,
        });
      }
    },
  };
});

jest.unstable_mockModule("../src/parts/IsSocket/IsSocket.js", () => ({
  isSocket: jest.fn(),
}));

const WebSocketServer = await import(
  "../src/parts/WebSocketServer/WebSocketServer.js"
);

const IsSocket = await import("../src/parts/IsSocket/IsSocket.js");

test("handleUpgrade", async () => {
  // @ts-ignore
  IsSocket.isSocket.mockImplementation(() => {
    return true;
  });
  const webSocket = await WebSocketServer.handleUpgrade();
  expect(webSocket).toEqual({ __isWebSocket: true });
});

test("handleUpgrade - error - socket is not of type Socket", async () => {
  const request = {};
  const socket = {};
  // @ts-ignore
  IsSocket.isSocket.mockImplementation(() => {
    return false;
  });
  expect(() => WebSocketServer.handleUpgrade(request, socket)).toThrow(
    new TypeError("socket must be of type Socket")
  );
});
