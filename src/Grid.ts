import {Point} from './Point';
import {drawNear, limitAbs} from './util';
import {GridConfiguration} from './GridConfiguration';

export class Grid {
  readonly grid: Point[][] = [];
  private prevDx: number[][] = [];
  private prevDy: number[][] = [];

  private options: GridConfiguration;

  // TODO: Rename speed parameter????
  constructor(options: GridConfiguration) {
    this.options = options;
    this.initialize();
  }

  get rows() {
    return this.options.rows;
  }

  get cols() {
    return this.options.cols;
  }

  private initialize() {
    for (let i = 0; i < this.rows; i++) {
      this.grid.push([]);
      this.prevDx.push([]);
      this.prevDy.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.grid[i].push(this.restPosition(i, j, this.options.centerPoint));
        this.prevDx[i].push(0);
        this.prevDy[i].push(0);
      }
    }
  }

  private restPosition(i: number, j: number, mainPoint: Point) {
    return new Point(
      mainPoint.x - this.options.cellSize * (this.options.centerPoint.x + i),
      mainPoint.y - this.options.cellSize * (this.options.centerPoint.y + j)
    );
  }

  private updateDifferentials(
    i: number,
    j: number,
    point: Point,
    restPosition: Point,
    mainPoint: Point
  ) {
    const prevDx = this.prevDx;
    const prevDy = this.prevDy;

    const prevDxValue = prevDx[i][j];
    const prevDyValue = prevDy[i][j];

    const distToMain = mainPoint.dist(point);

    // Update speed so it goes closer to the point it should be.
    let dx = (restPosition.x - point.x) / this.options.speed;
    let dy = (restPosition.y - point.y) / this.options.speed;

    // Make it a bit different depending on its position with respect to the main point.
    // This makes all points oscillate differently.
    // Without this, the entire grid would oscillate like it's solid.
    dx = dx * distToMain * this.options.distToMainWeight;
    dy = dy * distToMain * this.options.distToMainWeight;

    if (Math.abs(prevDxValue - dx) > this.options.dLimit) {
      dx = drawNear(prevDxValue, dx, this.options.limitAcc);
    }

    if (Math.abs(prevDyValue - dy) > this.options.dLimit) {
      dy = drawNear(prevDyValue, dy, this.options.limitAcc);
    }

    prevDx[i][j] = limitAbs(dx, this.options.maxD);
    prevDy[i][j] = limitAbs(dy, this.options.maxD);
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
    const restPosition = mainPoint.subtract(
      new Point(
        this.options.cellSize * (this.options.centerPoint.x + i),
        this.options.cellSize * (this.options.centerPoint.y + j)
      )
    );

    // Update prevDx[i] and prevDy[i]
    this.updateDifferentials(i, j, p, restPosition, mainPoint);

    p.setCoordinates(p.x + prevDx[i][j], p.y + prevDy[i][j]);

    const rest = this.restPosition(i, j, mainPoint);

    const diff = p.subtract(rest);

    if (
      diff.magnitude() > this.options.eps &&
      diff.magnitude() > this.options.maxDist
    ) {
      p.assign(rest.add(diff.normalize().scale(this.options.maxDist)));
    }
  }
}
