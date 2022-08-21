import React, { ReactElement } from 'react'
import { Point } from '@model/Point'
import { CanvasRenderer } from '@model/CanvasRenderer'
import { Grid } from '@model/Grid'
import config from '@config/default-grid-config.json'

export interface GridWrapperProps {
  elasticity: number
  distWeight: number
  rows: number
  cols: number
}

export class GridWrapper extends React.Component {
  private canvasElement?: HTMLCanvasElement
  private mainPoint: Point = new Point(0, 0)
  private mousePos: Point = new Point(0, 0)
  private canvasRenderer?: CanvasRenderer
  private grid?: Grid
  props: GridWrapperProps

  constructor (props: GridWrapperProps) {
    super(props)
    this.props = props
    console.log('Constructing GridWrapper')
  }

  private mouseMoveHandle (e: MouseEvent): void {
    const canvas: HTMLCanvasElement = e.currentTarget as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()

    this.mousePos.setCoordinates(e.clientX - rect.left, e.clientY - rect.top)
  }

  private buildGrid (): void {
    const { elasticity, distWeight, rows, cols } = this.props

    // TODO: Initialize grid centered by modifying these two points.
    this.mainPoint = new Point(0, 0)
    this.mousePos = new Point(0, 0)
    this.grid = new Grid({
      ...config,
      rows,
      cols,
      centerCell: {
        row: (rows - 1) / 2,
        col: (cols - 1) / 2
      },
      elasticity,
      distWeight
    })
  }

  componentDidMount (): void {
    console.log('Grid Wrapper Component mounted!')
    this.buildGrid()
    const canvas = this.canvasElement as HTMLCanvasElement
    this.canvasRenderer = new CanvasRenderer(canvas)
    canvas.addEventListener('mousemove', this.mouseMoveHandle.bind(this))
    this.loop()
  }

  private updateMainPoint (): void {
    this.mainPoint.x -= -(this.mousePos.x - this.mainPoint.x) / 5
    this.mainPoint.y -= -(this.mousePos.y - this.mainPoint.y) / 5
  }

  private update (): void {
    this.updateMainPoint();
    (this.grid as Grid).update(this.mainPoint)
  }

  private loop (): void {
    this.update();
    (this.canvasRenderer as CanvasRenderer).draw(this.grid as Grid, this.mainPoint)
    window.requestAnimationFrame(this.loop.bind(this))
  }

  componentWillUnmount (): void {
    // TODO: Remove event listeners
  }

  componentDidUpdate (): void {
    console.log('Grid Wrapper Component was updated...')
    this.buildGrid()
  }

  shouldComponentUpdate (nextProps: GridWrapperProps): boolean {
    const grid = this.grid as Grid
    grid.elasticity = nextProps.elasticity
    grid.distWeight = nextProps.distWeight

    const { rows, cols } = this.props

    if (rows !== nextProps.rows || cols !== nextProps.cols) return true
    return false
  }

  render (): ReactElement {
    return (
      <canvas
        width={800}
        height={800}
        style={{ border: '1px solid black' }}
        ref={(ref: HTMLCanvasElement) => { this.canvasElement = ref }}/>
    )
  }
}
