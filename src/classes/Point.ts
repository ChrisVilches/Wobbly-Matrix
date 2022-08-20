export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  assign(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }

  setCoordinates(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y);
  }

  subtract(p: Point): Point {
    return new Point(this.x - p.x, this.y - p.y);
  }

  magnitude(): number {
    return Math.hypot(this.x, this.y);
  }

  setMagnitude(m: number): Point {
    return this.normalize().scale(m);
  }

  normalize(): Point {
    return new Point(this.x / this.magnitude(), this.y / this.magnitude());
  }

  scale(f: number): Point {
    return new Point(this.x * f, this.y * f);
  }

  dist(p: Point): number {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }
}