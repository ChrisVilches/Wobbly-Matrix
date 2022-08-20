import {Point} from '@classes/Point';
import {CanvasRenderer} from '@classes/CanvasRenderer';
import {Grid} from '@classes/Grid';
import config from '@config/default-grid-config.json';

let canvasRenderer: CanvasRenderer;

const mainPoint: Point = new Point(0, 0);
const mousePos: Point = new Point(0, 0);

const grid: Grid = new Grid(config);

function updatemainPoint() {
  mainPoint.x -= -(mousePos.x - mainPoint.x) / 5;
  mainPoint.y -= -(mousePos.y - mainPoint.y) / 5;
}

function update() {
  updatemainPoint();
  grid.updatePoints(mainPoint);
}

function loop() {
  update();

  canvasRenderer.draw(grid, mainPoint);
  window.requestAnimationFrame(loop);
}

function mouseMoveHandle(e: MouseEvent) {
  mousePos.setCoordinates(e.clientX, e.clientY);
}

function createCanvasElement(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = 1800;
  canvas.height = 1800;
  canvas.style.border = '1px solid black';
  return canvas;
}

function main() {
  const canvasElement: HTMLCanvasElement = createCanvasElement();
  canvasElement.addEventListener('mousemove', mouseMoveHandle);
  document.body.append(canvasElement);

  canvasRenderer = new CanvasRenderer(canvasElement);

  loop();
}

document.addEventListener('DOMContentLoaded', main);
