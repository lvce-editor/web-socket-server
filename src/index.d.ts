import { WebSocket } from "ws";

export const handleUpgrade: (request: any, socket: any) => Promise<WebSocket>;
