import { Cell } from '@interfaces/Cell'

export interface GridConfiguration {
  centerCell: Cell
  rows: number
  cols: number
  cellSize: number
  distWeight: number
  elasticity: number
}
