import { RawData } from "ws";
import { Duplex } from "stream";
import { mouse, up, down, right, left } from "@nut-tree/nut-js";
import { drawRectangle } from "./draw/drawRectangle";
import { drawCircle } from "./draw/draw_circle";
import { square } from "./draw/draw_square";
import { mouse_position } from "./mouse_position";
import { printScreen } from "./print/prnt_scrn";

export const commandRouter = async (chunk: RawData, wsStrem: Duplex) => {
  const dataParse = chunk.toString().split(" ");

  const [command, ...args] = dataParse;
  console.log("Command:", chunk.toString());
  if (command !== "mouse_position" && command !== "prnt_scrn") {
    wsStrem.write(`${chunk.toString()}`);
    console.log("Result:", command, "completed successfully!");
  }
  switch (command) {
    case "mouse_up":
      mouse.move(up(Number(args)));
      return;
    case "mouse_down":
      mouse.move(down(Number(args)));
      return;
    case "mouse_right":
      mouse.move(right(Number(args)));
      return;
    case "mouse_left":
      mouse.move(left(Number(args)));
      return;
    case "mouse_position":
      await mouse_position(wsStrem);
      return;
    case "draw_square":
      const px = Number(args[0]);
      await square(px);
      return;
    case "draw_circle":
      await drawCircle(args);
      return;
    case "draw_rectangle":
      await drawRectangle(args);
      return;
    case "prnt_scrn":
      await printScreen(wsStrem);
      return;
  }
};
