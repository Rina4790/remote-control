import { mouse } from "@nut-tree/nut-js";
import { Duplex } from "stream";

export const mouse_position = async (wsStrem: Duplex) => {
  try {
    const position = await mouse.getPosition();
    wsStrem.write(`mouse_position ${position.x},${position.y}`);
    console.log(`Result: mouse_position , ${position.x},${position.y}`);
  } catch (err) {
    console.log(err);
  }
};
