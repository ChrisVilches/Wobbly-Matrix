import {Cell} from '@interfaces/Cell';

export interface GridConfiguration {
  centerCell: Cell;
  rows: number;
  cols: number;
  cellSize: number;

  // TODO: Rename speed parameter????
  speed: number;
  eps: number;
  maxDist: number;
  dLimit: number;
  limitAcc: number;
  distToMainWeight: number;
  maxD: number;
}
