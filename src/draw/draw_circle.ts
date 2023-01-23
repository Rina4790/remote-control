import { mouse, Button, Point, straightTo } from "@nut-tree/nut-js";

export const drawCircle = async (radius: string[]) => {
	const radiusNum = Number(radius[0])
	await mouse.leftClick();
	await mouse.pressButton(Button.LEFT);
	const mousePos = await mouse.getPosition();
	for (let i = 0; i <= Math.PI * 2; i += 0.01) {
	  const x = mousePos.x - radiusNum + radiusNum * Math.cos(i);
	  const y = mousePos.y + radiusNum * Math.sin(i);
	  const target = new Point(x, y);
	  await mouse.move(straightTo(target));
	}
	await mouse.releaseButton(Button.LEFT);
 };