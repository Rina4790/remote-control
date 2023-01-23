import { httpServer } from "./http_server/index";
import * as WebSocket from "ws";
import { EOL } from "os";
import * as dotenv from "dotenv";
import { commandRouter } from "./command";

dotenv.config();
const HTTP_PORT = Number(process.env.HTTP_PORT) || 8080;
const WSS_PORT = Number(process.env.WSS_PORT) || 4000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocket.WebSocketServer({ port: WSS_PORT });

wss.on("headers", (headers, request) => {
  const connection = `${headers[2]}!${EOL}`;
  const info = `${request.rawHeaders[0]}: ${request.rawHeaders[1]} with front: ${request.rawHeaders[13]}`;
  console.log(`${connection}Websocket has been started on ${info}`);
});

wss.on("connection", (ws: WebSocket.WebSocket) => {
  const wsStrem = WebSocket.createWebSocketStream(ws, {
    encoding: "utf-8",
    decodeStrings: false,
  });
  wsStrem
    .on("data", async (chunk) => {
      await commandRouter(chunk, wsStrem);
    })
    .on("error", (error) => {
      console.log("webSocketStream has Error:", error);
    })
    .on("close", () => {
      console.log("webSocketStream has been closed!");
      wsStrem.end();
    })
  .on("close", () => {
    console.log("WebSocketServer closed!");
    
  })

  .on("error", (error) => {
    console.log("WebSocketServer has Error:", error);
  });
});

process.on("SIGINT", () => {
  wss.clients.forEach((client) => {
	  if (client.readyState === WebSocket.WebSocket.OPEN) {
		  client.close()
	  };
  });
  console.log("\n", "Websocket has been closed!");
  wss.close();
  httpServer.close();
  process.exit();
});
