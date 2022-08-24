import { Point } from '@model/Point'
import { Cell } from '@interfaces/Cell'
import { GridConfiguration } from '@interfaces/GridConfiguration'

export class Grid {
  readonly grid: Point[][] = []
  readonly rows: number
  readonly cols: number
  private readonly prevD: Point[][] = []
  private readonly cellSize: number
  private readonly centerCell: Cell
  distWeight: number
  elasticity: number

  constructor (options: GridConfiguration, mainPoint: Point = new Point(0, 0)) {
    this.distWeight = options.distWeight
    this.elasticity = options.elasticity
    this.cellSize = options.cellSize
    this.centerCell = options.centerCell
    this.rows = options.rows
    this.cols = options.cols
    this.initialize(mainPoint)
  }

  private initialize (mainPoint: Point): void {
    for (let i = 0; i < this.rows; i++) {
      this.grid.push([])
      this.prevD.push([])
      for (let j = 0; j < this.cols; j++) {
        this.grid[i].push(this.restPosition(i, j, mainPoint))
        this.prevD[i].push(new Point(0, 0))
      }
    }
  }

  private restPosition (i: number, j: number, mainPoint: Point): Point {
    return new Point(
      mainPoint.x - this.cellSize * (this.centerCell.col - j),
      mainPoint.y - this.cellSize * (this.centerCell.row - i)
    )
  }

  private updateOffsets (i: number, j: number, point: Point, mainPoint: Point): void {
    const d1 = this.prevD[i][j]

    const dist = mainPoint.dist(point)

    const factor = 1 / Math.log2(dist * this.distWeight + 2) ** 2

    const restPosition = this.restPosition(i, j, mainPoint)
    const d2 = restPosition.subtract(point).scale(factor)
    this.prevD[i][j] = d2.add(d1.subtract(d2).scale(this.elasticity))
  }

  update (mainPoint: Point): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.updatePoint(i, j, mainPoint)
      }
    }
  }

  // TODO: Some of the movement is a bit glitchy, but I'm not so sure.
  generateRipple (p: Point): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const dist = this.grid[i][j].dist(p)

        if (dist < 1e-1) continue

        const dirNormalized = this.grid[i][j].subtract(p).scale(1 / dist)
        const factor = 5 / (Math.log2(dist * this.distWeight + 2) ** 0.1)

        this.prevD[i][j] = this.prevD[i][j].add(dirNormalized.scale(factor))
      }
    }
  }

  private updatePoint (i: number, j: number, mainPoint: Point): void {
    const p = this.grid[i][j]
    this.updateOffsets(i, j, p, mainPoint)
    this.grid[i][j] = p.add(this.prevD[i][j])
  }
}
