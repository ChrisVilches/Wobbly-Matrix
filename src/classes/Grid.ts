import {Point} from '@classes/Point';
import {Cell} from '@interfaces/Cell';
import {GridConfiguration} from '@interfaces/GridConfiguration';

export class Grid {
  readonly grid: Point[][] = [];
  readonly rows: number;
  readonly cols: number;
  private prevD: Point[][] = [];
  private _distWeight: number;
  private _elasticity: number;
  private cellSize: number;
  private centerCell: Cell;

  constructor(options: GridConfiguration) {
    this._distWeight = options.distWeight;
    this._elasticity = options.elasticity;
    this.cellSize = options.cellSize;
    this.centerCell = options.centerCell;
    this.rows = options.rows;
    this.cols = options.cols;
    this.initialize();
  }

  set elasticity(e: number) {
    this._elasticity = e;
  }

  set distWeight(w: number) {
    this._distWeight = w;
  }

  private initialize() {
    for (let i = 0; i < this.rows; i++) {
      this.grid.push([]);
      this.prevD.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.grid[i].push(this.restPosition(i, j, new Point(0, 0)));
        this.prevD[i].push(new Point(0, 0));
      }
    }
  }

  private restPosition(i: number, j: number, mainPoint: Point) {
    return new Point(
      mainPoint.x - this.cellSize * (this.centerCell.col - j),
      mainPoint.y - this.cellSize * (this.centerCell.row - i)
    );
  }

  private updateOffsets(
    i: number,
    j: number,
    point: Point,
    restPosition: Point,
    mainPoint: Point
  ) {
    const d1 = this.prevD[i][j];

    const dist = mainPoint.dist(point);

    const factor = 1 / Math.log2(dist * this._distWeight + 2) ** 2;

    const d2 = restPosition.subtract(point).scale(factor);
    this.prevD[i][j] = d2.add(d1.subtract(d2).scale(this._elasticity));
  }

  update(mainPoint: Point) {
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

    this.grid[i][j] = p.add(this.prevD[i][j]);
  }
}
