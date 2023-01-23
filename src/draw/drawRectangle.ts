import { mouse, Button, right, down, left, up } from "@nut-tree/nut-js";

export const drawRectangle = async (args: string[]) => {
	mouse.config.mouseSpeed = 200;
	const [width, length] = args
	await mouse.leftClick();
	await mouse.pressButton(Button.LEFT);
	await mouse.move(right(+length));
	await mouse.move(down(+width));
	await mouse.move(left(+length));
	await mouse.move(up(+width));
	await mouse.releaseButton(Button.LEFT);
 };