import { Point } from '@model/Point'
import { Grid } from '@model/Grid'
import { GridRendering } from '@interfaces/GridRendering'
import gridRenderingJson from '@config/grid-rendering.json'

const gridRendering = gridRenderingJson as GridRendering

export class CanvasRenderer {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  constructor (canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  private drawLine (p1: Point, p2: Point): void {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.strokeStyle = gridRendering.colors.gridSegment
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }

  private drawCircle (p: Point, radius: number, color: string): void {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
  }

  draw (gridInstance: Grid, mainPoint: Point): void {
    const ctx = this.ctx
    const grid = gridInstance.grid
    const rows = gridInstance.rows
    const cols = gridInstance.cols

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const p = grid[i][j]
        if (i < rows - 1) {
          const q = grid[i + 1][j]
          this.drawLine(p, q)
        }
        if (j < cols - 1) {
          const q = grid[i][j + 1]
          this.drawLine(p, q)
        }
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.drawCircle(grid[i][j], gridRendering.sizes.gridCircle, gridRendering.colors.gridPoints)
      }
    }
  }
}
