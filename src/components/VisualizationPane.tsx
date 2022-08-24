import React, { ReactElement } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import { ZoomIcon } from '@components/ZoomIcon'

interface VisualizationPaneProps {
  elasticity: number
  distWeight: number
  frameLimit: boolean
  matrixSize: number
  enlarged: boolean
  setEnlarged: Function
  setFrameLimit: Function
}

const scale = (min: number, max: number, n: number): number => {
  const length = max - min
  return min + (length * n / 100)
}

const scaleElasticity = (n: number): number => scale(0.1, 0.99, n)
const scaleDistWeight = (n: number): number => scale(0.0001, 0.003, n)

export const VisualizationPane = ({ elasticity, distWeight, frameLimit, setFrameLimit, matrixSize, enlarged, setEnlarged }: VisualizationPaneProps): ReactElement => (
  <>
    <GridWrapper
      elasticity={scaleElasticity(elasticity)}
      distWeight={scaleDistWeight(distWeight)}
      frameLimit={frameLimit}
      rows={matrixSize}
      cols={matrixSize}
      enableRipple={true}/>

    <div className="mt-4">
      <button className="xl:inline hidden btn btn-primary" onClick={() => setEnlarged(!enlarged)}>
        <ZoomIcon zoomedIn={enlarged}/>
      </button>

      <label className="form-check-label inline-block text-gray-800 float-right">
        <input
          defaultChecked={frameLimit}
          onClick={() => setFrameLimit(!frameLimit)}
          type="checkbox"
          className="rounded-full hover:shadow-md bg-blue-100 border-blue-300 text-blue-400 hover:text-blue-500 focus:ring-blue-200 mr-3"/>
        Limit framerate
      </label>
    </div>
  </>
)
