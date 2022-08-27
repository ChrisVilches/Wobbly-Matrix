import React, { ReactElement, useState } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import { ZoomIcon } from '@components/ZoomIcon'
import { scale } from '@util/scale'
import gridRenderingJson from '@config/grid-rendering.json'
import { GridRendering } from '@interfaces/GridRendering'
import { isMobile } from 'react-device-detect'

const { renderPointsDefault } = gridRenderingJson as GridRendering

interface VisualizationPaneProps {
  elasticity: number
  distWeight: number
  matrixSize: number
  enlarged: boolean
  setEnlarged: Function
}

const scaleElasticity = (n: number): number => scale(0.1, 0.99, n)
const scaleDistWeight = (n: number): number => scale(0.0001, 0.003, n)

export const VisualizationPane = ({ elasticity, distWeight, matrixSize, enlarged, setEnlarged }: VisualizationPaneProps): ReactElement => {
  const [frameLimit, setFrameLimit] = useState(false)
  const [drawPoints, setDrawPoints] = useState(renderPointsDefault)

  return (
    <>
      <GridWrapper
        elasticity={scaleElasticity(elasticity)}
        distWeight={scaleDistWeight(distWeight)}
        frameLimit={frameLimit}
        rows={matrixSize}
        cols={matrixSize}
        drawPoints={drawPoints}
        enableRipple={!isMobile}/>

      <div className="mt-4">
        <button className="xl:inline hidden btn btn-primary" onClick={() => setEnlarged(!enlarged)}>
          <ZoomIcon zoomedIn={enlarged}/>
        </button>

        <div className="inline-block float-right">
          <label className="form-check-label text-gray-800 mr-8">
            <input
              defaultChecked={drawPoints}
              onClick={() => setDrawPoints(!drawPoints)}
              type="checkbox"
              className="rounded-full hover:shadow-md bg-blue-100 border-blue-300 text-blue-400 hover:text-blue-500 focus:ring-blue-200 mr-2"/>
            Render points
          </label>

          <label className="form-check-label text-gray-800">
            <input
              defaultChecked={frameLimit}
              onClick={() => setFrameLimit(!frameLimit)}
              type="checkbox"
              className="rounded-full hover:shadow-md bg-blue-100 border-blue-300 text-blue-400 hover:text-blue-500 focus:ring-blue-200 mr-2"/>
            Limit framerate
          </label>
        </div>
      </div>
    </>
  )
}
