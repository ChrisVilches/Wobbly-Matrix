import {Point} from './Point';
import {Grid} from './Grid';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  readonly width: number;
  readonly height: number;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private drawLine(p1: Point, p2: Point): void {
    const ctx = this.ctx;
    const size = 5;
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(p1.x - size / 2, p1.y - size / 2);
    ctx.lineTo(p2.x - size / 2, p2.y - size / 2);
    ctx.stroke();
  }

  private drawCircle(p: Point, radius: number, color: string): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  draw(gridInstance: Grid, mainPoint: Point): void {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;
    const grid = gridInstance.grid as Point[][];
    const rows = gridInstance.rows;
    const cols = gridInstance.cols;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.drawCircle(grid[i][j], 15, '#000088');
      }
    }

    this.drawCircle(mainPoint, 10, '#990000');

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
