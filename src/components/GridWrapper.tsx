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
  }

  private mouseMoveHandle (e: MouseEvent): void {
    const canvas: HTMLCanvasElement = e.currentTarget as HTMLCanvasElement
    const x = e.offsetX * canvas.width / canvas.clientWidth
    const y = e.offsetY * canvas.height / canvas.clientHeight
    this.mousePos.setCoordinates(x, y)
  }

  private buildGrid (): void {
    const { elasticity, distWeight, rows, cols } = this.props

    const canvas = this.canvasElement as HTMLCanvasElement
    const x = canvas.width / 2
    const y = canvas.height / 2

    this.mainPoint = new Point(x, y)
    this.mousePos = new Point(x, y)
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

    if (this.props.frameLimit) {
      // TODO: Do a more proper frame limit? (This works fine though).
      setTimeout(() => window.requestAnimationFrame(this.loop.bind(this)), 50)
    } else {
      window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  componentWillUnmount (): void {
    // TODO: Remove event listeners added in this component.
  }

  componentDidUpdate (): void {
    console.log('Grid Wrapper Component was updated...')
    this.buildGrid()
  }

  shouldComponentUpdate (nextProps: GridWrapperProps): boolean {
    // TODO: Grid fields shouldn't be updated here, but for now this seems to be the most efficient
    //       way to get the props, but without re-rendering the component.
    //       I think the best way to go about this would be to simply conditionally
    //       rebuild the matrix only if the size changed, but not if anything else did (but do return true).
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
        height={1000}
        width={1000}
        className="w-full border-2"
        ref={(ref: HTMLCanvasElement) => { this.canvasElement = ref }}/>
    )
  }
}
