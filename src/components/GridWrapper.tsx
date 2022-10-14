import React, { MutableRefObject, useEffect, useRef, ReactElement, useCallback } from 'react'
import { Point } from '@model/Point'
import { CanvasRenderer } from '@model/CanvasRenderer'
import { Grid } from '@model/Grid'
import { useAnimationFrame } from '@hooks/useAnimationFrame'
import config from '@config/default-grid-config.json'
import useMouseOpts from '@config/use-mouse-options.json'
import useMouse, { MousePosition, UseMouseOptions } from '@react-hook/mouse-position'

interface GridWrapperProps {
  elasticity: number
  distWeight: number
  rows: number
  cols: number
  frameLimit?: boolean
  enableRipple?: boolean
  drawPoints?: boolean
}

const setMousePosition = (mousePositionResult: MousePosition, canvasElement: HTMLCanvasElement, mousePos: Point): void => {
  let { x, y, elementWidth, elementHeight } = mousePositionResult

  if (x === null || y === null) return
  if (elementWidth === null || elementHeight === null) return

  x *= canvasElement.width / elementWidth
  y *= canvasElement.height / elementHeight
  mousePos.set(x, y)
}

export const GridWrapper = ({ elasticity, distWeight, rows, cols, frameLimit = false, enableRipple = false, drawPoints = false }: GridWrapperProps): ReactElement => {
  const canvasElement: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  const canvasRenderer: MutableRefObject<CanvasRenderer | null> = useRef(null)
  const mainPoint: MutableRefObject<Point | null> = useRef(null)
  const mousePos: MutableRefObject<Point | null> = useRef(null)
  const grid: MutableRefObject<Grid | null> = useRef(null)

  const resetFollowPoints = useCallback((): void => {
    console.log('Resetting points')
    const canvas = canvasElement.current!
    if (mainPoint.current === null || mousePos.current === null) {
      mainPoint.current = new Point(0, 0)
      mousePos.current = new Point(0, 0)
    }
    mousePos.current.set(canvas.width / 2, canvas.height / 2)
    mainPoint.current.set(canvas.width / 2, canvas.height / 2)
  }, [])

  useEffect(() => {
    console.log('Initializing data')
    canvasRenderer.current = new CanvasRenderer(canvasElement.current!, false)
    return () => {
      console.log('<GridWrapper> Unmounted')
    }
  }, [])

  useEffect(() => {
    canvasRenderer.current!.drawPoints = drawPoints
  }, [drawPoints])

  useEffect(() => {
    const rebuild = grid?.current?.rows !== rows || grid?.current?.cols !== cols

    if (rebuild) {
      console.log('Rebuilding grid')
      resetFollowPoints()
      const mainOpts = { ...config, rows, cols }
      const centerCell = {
        row: (rows - 1) / 2,
        col: (cols - 1) / 2
      }
      grid.current = new Grid({ ...mainOpts, centerCell }, mainPoint.current!)
    }

    grid.current!.elasticity = elasticity
    grid.current!.distWeight = distWeight
  }, [rows, cols, elasticity, distWeight, resetFollowPoints])

  const canvasClickHandle = useCallback(
    (): void => {
      if (enableRipple) {
        grid.current?.generateRipple(mousePos.current!)
      }
    },
    [enableRipple]
  )

  setMousePosition(useMouse(canvasElement, useMouseOpts as UseMouseOptions), canvasElement.current!, mousePos.current!)

  useAnimationFrame(frameLimit, (_deltaTime: number) => {
    const main = mainPoint.current!
    const mouse = mousePos.current!
    main.x += (mouse.x - main.x) / 5
    main.y += (mouse.y - main.y) / 5

    canvasRenderer.current!.draw(grid.current!)
    grid.current!.update(main)
  })

  return (
    <canvas
      width={1000}
      height={800}
      style={{ touchAction: 'none' }}
      className="w-full border-2 select-none"
      onMouseDown={canvasClickHandle}
      ref={canvasElement}/>
  )
}
