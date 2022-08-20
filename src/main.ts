import {Point} from './Point';
import {CanvasRenderer} from './CanvasRenderer';
import {Grid} from './Grid';
import {PointCoordinates} from './PointCoordinates';
import {GridConfiguration} from './GridConfiguration';
import config from './default-grid-config.json';

let canvasRenderer: CanvasRenderer;
let mainPoint: Point;

const mousePos: Point = new Point(0, 0);

const gridConfig: GridConfiguration = {
  ...config,
  centerPoint: Point.fromJson(config.centerPoint as PointCoordinates),
};

const grid: Grid = new Grid(gridConfig);

function updateMainPoint() {
  mainPoint.x -= -(mousePos.x - mainPoint.x) / 5;
  mainPoint.y -= -(mousePos.y - mainPoint.y) / 5;
}

function update() {
  updateMainPoint();
  grid.updatePoints(mainPoint);
}

function loop() {
  update();

  canvasRenderer.draw(grid, mainPoint);

  window.requestAnimationFrame(loop);
}

function mouseMoveHandle(e: MouseEvent) {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}

function main() {
  document.write(
    '<canvas id="main-canvas" width="1800" height="1800" style="border: 1px solid black"></canvas>'
  );

  const canvasElement: HTMLCanvasElement = document.getElementById(
    'main-canvas'
  ) as HTMLCanvasElement;

  canvasRenderer = new CanvasRenderer(canvasElement);
  mainPoint = new Point(canvasRenderer.width / 2, canvasRenderer.height / 2);

  canvasRenderer.setMouseMoveHandler(mouseMoveHandle);

  loop();
}

document.addEventListener('DOMContentLoaded', main);
