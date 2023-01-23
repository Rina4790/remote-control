import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { Duplex } from "stream";

export const printScreen = async (webSocketStream: Duplex) => {
  try {
    const mousePos = await mouse.getPosition();
    const left = mousePos.x - 100;
    const top = mousePos.y - 100;
    const region = new Region(left, top, 200, 200);
    const img = await screen.grabRegion(region);

    const imgRGB = await img.toRGB();

    const imgJimp = new Jimp({
      data: imgRGB.data,
      width: imgRGB.width,
      height: imgRGB.height,
    });

    const imgBuffer = await imgJimp.getBufferAsync(Jimp.MIME_PNG);
    const imgResult = imgBuffer.toString("base64");
    webSocketStream.write(`prnt_scrn ${imgResult}`);
    console.log("Result: prnt_scrn", "completed successfully!");
  } catch (err) {
    console.log(err);
    return err;
  }
};
