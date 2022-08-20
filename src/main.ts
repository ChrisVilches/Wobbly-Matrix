import {Point} from './Point';
import {CanvasRenderer} from './CanvasRenderer';
import {Grid} from './Grid';
import {PointCoordinates} from './PointCoordinates';
//import config from './config.json';

const config = {
  speed: 50,
  cellSize: 150,
  limitAcc: 1.5,
  dLimit: 1.2,
  rows: 5,
  cols: 5,
  distToMainWeight: 0.125,
  maxD: 100,
  centerPoint: {
    x: -2,
    y: -2,
  },
  EPS: 1e-7,
  MAX_DIST: 150,
};

let canvasRenderer: CanvasRenderer;
const mousePos: Point = new Point(0, 0);

// This point follows the mouse position.
let mainPoint: Point;

const grid: Grid = new Grid(
  Point.fromJson(config.centerPoint as PointCoordinates),
  config.rows,
  config.cols,
  config.cellSize,
  config.speed
);

function updateMainPoint() {
  mainPoint.x -= -(mousePos.x - mainPoint.x) / 20;
  mainPoint.y -= -(mousePos.y - mainPoint.y) / 20;
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

  canvasRenderer = new CanvasRenderer(
    document.getElementById('main-canvas') as HTMLCanvasElement
  );
  mainPoint = new Point(canvasRenderer.width / 2, canvasRenderer.height / 2);

  canvasRenderer.setMouseMoveHandler(mouseMoveHandle);

  loop();
}

document.addEventListener('DOMContentLoaded', main);
