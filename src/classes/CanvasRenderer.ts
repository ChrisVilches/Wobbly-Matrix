import {Point} from '@classes/Point';
import {Grid} from '@classes/Grid';
import {ColorPalette} from '@interfaces/ColorPalette';
import colorsJson from '@config/render-colors.json';

const colors = <ColorPalette>colorsJson;

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private drawLine(p1: Point, p2: Point): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = colors.gridSegment;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  private drawCircle(p: Point, radius: number, color: string): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  draw(gridInstance: Grid, mainPoint: Point): void {
    const ctx = this.ctx;
    const grid = gridInstance.grid as Point[][];
    const rows = gridInstance.rows;
    const cols = gridInstance.cols;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.drawCircle(grid[i][j], 10, colors.gridPoints);
      }
    }

    this.drawCircle(mainPoint, 5, colors.centerPoint);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const p = grid[i][j];
        if (i < rows - 1) {
          const q = grid[i + 1][j];
          this.drawLine(p, q);
        }
        if (j < cols - 1) {
          const q = grid[i][j + 1];
          this.drawLine(p, q);
        }
      }
    }
  }
}
