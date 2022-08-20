import {Point} from './Point';
import {drawNear, limitAbs} from './util';
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

const limitAcc = config.limitAcc;
const dLimit = config.dLimit;
const distToMainWeight = config.distToMainWeight;
const maxD = config.maxD;

export class Grid {
  readonly grid: Point[][];
  readonly rows: number;
  readonly cols: number;
  private centerPoint: Point;
  private cellSize: number;
  private speed: number;
  private prevDx: number[][];
  private prevDy: number[][];

  // TODO: Rename speed parameter????
  constructor(
    centerPoint: Point,
    rows: number,
    cols: number,
    cellSize: number,
    speed: number
  ) {
    this.rows = rows;
    this.cols = cols;
    // TODO: Should be passable from parameters. Not from config file.
    this.centerPoint = centerPoint;
    this.cellSize = cellSize;
    this.speed = speed;

    // Coordinates relative to the main point.
    const grid: Point[][] = [];
    const prevDx: number[][] = [];
    const prevDy: number[][] = [];

    for (let i = 0; i < rows; i++) {
      grid.push([]);
      prevDx.push([]);
      prevDy.push([]);
      for (let j = 0; j < cols; j++) {
        grid[i].push(this.pointShouldBePosition(i, j, this.centerPoint));
        prevDx[i].push(0);
        prevDy[i].push(0);
      }
    }

    this.grid = grid;
    this.prevDx = prevDx;
    this.prevDy = prevDy;
  }

  // Calculates the position a point should be assuming it's not wobbly
  // (i.e. if the grid was solid).
  private pointShouldBePosition(i: number, j: number, mainPoint: Point) {
    const centerPoint = this.centerPoint;
    const cellSize = this.cellSize;
    return new Point(
      mainPoint.x - cellSize * (centerPoint.x + i),
      mainPoint.y - cellSize * (centerPoint.y + j)
    );
  }

  private updateDifferentials(
    i: number,
    j: number,
    point: Point,
    shouldPoint: Point,
    mainPoint: Point
  ) {
    const prevDx = this.prevDx;
    const prevDy = this.prevDy;

    const prevDxValue = prevDx[i][j];
    const prevDyValue = prevDy[i][j];

    const distToMain = mainPoint.dist(point);

    // Update speed so it goes closer to the point it should be.
    let dx = (shouldPoint.x - point.x) / this.speed;
    let dy = (shouldPoint.y - point.y) / this.speed;

    // Make it a bit different depending on its position with respect to the main point.
    // This makes all points oscillate differently.
    // Without this, the entire grid would oscillate like it's solid.
    dx = dx * distToMain * distToMainWeight;
    dy = dy * distToMain * distToMainWeight;

    // Instead of setting dx and dy to the current distance, lower it to make it
    // close to the value it should be. This creates the oscillation effect.
    if (Math.abs(prevDxValue - dx) > dLimit) {
      dx = drawNear(prevDxValue, dx, limitAcc);
    }
    if (Math.abs(prevDyValue - dy) > dLimit) {
      dy = drawNear(prevDyValue, dy, limitAcc);
    }

    prevDx[i][j] = limitAbs(dx, maxD);
    prevDy[i][j] = limitAbs(dy, maxD);
  }

  updatePoints(mainPoint: Point) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.updatePoint(i, j, mainPoint);
      }
    }
  }

  // TODO: Main point should be called differently
  private updatePoint(i: number, j: number, mainPoint: Point) {
    const prevDx = this.prevDx;
    const prevDy = this.prevDy;
    const grid = this.grid;

    const p = grid[i][j];
    const shouldPoint = mainPoint.subtract(
      new Point(
        this.cellSize * (this.centerPoint.x + i),
        this.cellSize * (this.centerPoint.y + j)
      )
    );

    // Update prevDx[i] and prevDy[i]
    this.updateDifferentials(i, j, p, shouldPoint, mainPoint);

    p.setCoordinates(p.x + prevDx[i][j], p.y + prevDy[i][j]);

    // TODO: Rename
    const rest = this.pointShouldBePosition(i, j, mainPoint);

    // TODO: Use "magnitude" method
    const magnitude = Math.hypot(p.x - rest.x, p.y - rest.y);

    // TODO: MAX DIST should be proportional to grid size (calculated automatically without
    //       having to define it)
    if (magnitude > config.EPS && magnitude > config.MAX_DIST) {
      const diff = p.subtract(rest);
      p.assign(rest.add(diff.normalize().scale(config.MAX_DIST)));
    }
  }
}
