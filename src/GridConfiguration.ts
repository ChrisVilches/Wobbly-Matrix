import {Point} from './Point';

export interface GridConfiguration {
  centerPoint: Point;
  rows: number;
  cols: number;
  cellSize: number;
  speed: number;
  eps: number;
  maxDist: number;
  dLimit: number;
  limitAcc: number;
  distToMainWeight: number;
  maxD: number;
}
