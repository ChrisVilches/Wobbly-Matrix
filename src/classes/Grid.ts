import {Point} from '@classes/Point';
import {GridConfiguration} from '@interfaces/GridConfiguration';

export class Grid {
  readonly grid: Point[][] = [];

  // TODO: Consider using a matrix of "vectors", not two matrices of independent X, Y values.
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

  private updateOffsets(
    i: number,
    j: number,
    point: Point,
    restPosition: Point,
    mainPoint: Point
  ) {
    const prevDxValue = this.prevDx[i][j];
    const prevDyValue = this.prevDy[i][j];

    const distToMain = mainPoint.dist(point);

    let d = restPosition.subtract(point);

    d = d.scale(1 / Math.pow(Math.log2(distToMain / 500 + 2), 2));

    const prevD = new Point(prevDxValue, prevDyValue);
    d = d.add(prevD.subtract(d).scale(0.8));

    /*
    if (d.magnitude() > this.options.maxD) {
      d = d.setMagnitude(this.options.maxD);
    }
    */

    this.prevDx[i][j] = d.x;
    this.prevDy[i][j] = d.y;
  }

  updatePoints(mainPoint: Point) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.updatePoint(i, j, mainPoint);
      }
    }
  }

  private updatePoint(i: number, j: number, mainPoint: Point) {
    const p = this.grid[i][j];
    const restPosition = this.restPosition(i, j, mainPoint);

    this.updateOffsets(i, j, p, restPosition, mainPoint);

    p.setCoordinates(p.x + this.prevDx[i][j], p.y + this.prevDy[i][j]);

    /*
    const dir = p.subtract(restPosition);

    if (dir.magnitude() > this.options.maxDist) {
      p.assign(restPosition.add(dir.setMagnitude(this.options.maxDist)));
    }
    */
  }
}
