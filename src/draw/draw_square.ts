import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";

export const square = async (px: number) => {
  mouse.config.mouseSpeed = 200;
  await mouse.leftClick();
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(px));
  await mouse.move(down(px));
  await mouse.move(left(px));
  await mouse.move(up(px));
  await mouse.releaseButton(Button.LEFT);
};
