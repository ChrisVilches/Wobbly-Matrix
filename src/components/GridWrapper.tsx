import React, { ReactElement } from 'react'
import { Point } from '@model/Point'
import { CanvasRenderer } from '@model/CanvasRenderer'
import { Grid } from '@model/Grid'
import config from '@config/default-grid-config.json'

export interface GridWrapperProps {
  elasticity: number
  distWeight: number
  frameLimit: boolean
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

    this.mouseMoveHandle = this.mouseMoveHandle.bind(this)
  }

  private mouseMoveHandle (e: MouseEvent): void {
    const canvas: HTMLCanvasElement = e.currentTarget as HTMLCanvasElement
    const x = e.offsetX * canvas.width / canvas.clientWidth
    const y = e.offsetY * canvas.height / canvas.clientHeight
    this.mousePos.setCoordinates(x, y)
  }

  private resetFollowPoints (): void {
    const canvas = this.canvasElement as HTMLCanvasElement
    const x = canvas.width / 2
    const y = canvas.height / 2

    this.mainPoint = new Point(x, y)
    this.mousePos = new Point(x, y)
  }

  private buildGrid (rebuild: boolean = true): void {
    const { elasticity, distWeight, rows, cols } = this.props

    if (!rebuild) {
      const g = this.grid as Grid
      g.elasticity = elasticity
      g.distWeight = distWeight
      return
    }

    this.resetFollowPoints()

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
    },
    this.mainPoint)
  }

  componentDidMount (): void {
    console.log('Grid Wrapper Component mounted!')
    this.buildGrid()
    const canvas = this.canvasElement as HTMLCanvasElement
    this.canvasRenderer = new CanvasRenderer(canvas)
    canvas.addEventListener('mousemove', this.mouseMoveHandle)

    this.loop()
  }

  private updateMainPoint (): void {
    this.mainPoint.x += (this.mousePos.x - this.mainPoint.x) / 5
    this.mainPoint.y += (this.mousePos.y - this.mainPoint.y) / 5
  }

  private update (): void {
    this.updateMainPoint();
    (this.grid as Grid).update(this.mainPoint)
  }

  private loop (): void {
    this.update();
    (this.canvasRenderer as CanvasRenderer).draw(this.grid as Grid, this.mainPoint)

    if (this.props.frameLimit) {
      setTimeout(() => window.requestAnimationFrame(this.loop.bind(this)), 50)
    } else {
      window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  private removeMouseListener (): void {
    console.log('Removing event')
    const canvas = this.canvasElement as HTMLCanvasElement
    canvas.removeEventListener('mousemove', this.mouseMoveHandle)
  }

  componentWillUnmount (): void {
    console.log('Unmounted')
    this.removeMouseListener()
  }

  componentDidUpdate (prevProps: GridWrapperProps): void {
    const rebuild = prevProps.cols !== this.props.cols || prevProps.rows !== this.props.rows
    console.log('Grid Wrapper Component was updated.... Rebuild?: ', rebuild)

    this.buildGrid(rebuild)
  }

  render (): ReactElement {
    return (
      <canvas
        width={1000}
        height={800}
        className="w-full border-2"
        ref={(ref: HTMLCanvasElement) => { this.canvasElement = ref }}/>
    )
  }
}
