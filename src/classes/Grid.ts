import {Point} from '@classes/Point';
import {GridConfiguration} from '@interfaces/GridConfiguration';
import {drawNear, limitAbs} from '../util';

export class Grid {
  readonly grid: Point[][] = [];
  private prevDx: number[][] = [];
  private prevDy: number[][] = [];
  private options: GridConfiguration;

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
        this.grid[i].push(this.restPosition(i, j, new Point(0, 0)));
        this.prevDx[i].push(0);
        this.prevDy[i].push(0);
      }
    }
  }

  private restPosition(i: number, j: number, mainPoint: Point) {
    return new Point(
      mainPoint.x - this.options.cellSize * (this.options.centerCell.col - j),
      mainPoint.y - this.options.cellSize * (this.options.centerCell.row - i)
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

  private updatePoint(i: number, j: number, mainPoint: Point) {
    const prevDx = this.prevDx;
    const prevDy = this.prevDy;
    const grid = this.grid;

    const p = grid[i][j];
    const restPosition = this.restPosition(i, j, mainPoint);

    this.updateDifferentials(i, j, p, restPosition, mainPoint);

    p.setCoordinates(p.x + prevDx[i][j], p.y + prevDy[i][j]);

    const diff = p.subtract(restPosition);

    if (
      diff.magnitude() > this.options.eps &&
      diff.magnitude() > this.options.maxDist
    ) {
      p.assign(restPosition.add(diff.normalize().scale(this.options.maxDist)));
    }
  }
}
