import React, { ReactElement } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface ConfigurationFormProps {
  elasticity: number
  distWeight: number
  matrixSize: number
  setElasticity: Function
  setDistWeight: Function
  setMatrixSize: Function
  reset: React.MouseEventHandler<HTMLButtonElement>
}

export const ConfigurationForm = ({ elasticity, setElasticity, distWeight, setDistWeight, matrixSize, setMatrixSize, reset }: ConfigurationFormProps): ReactElement => (
  <>
    <div className="parameter-label">Elasticity</div>
    <Slider onChange={val => setElasticity(val as number)} value={elasticity}/>

    <div className="mt-8 parameter-label">Deformation</div>
    <Slider onChange={val => setDistWeight(val as number)} value={distWeight}/>

    <div className="mt-8 parameter-label">Matrix size ({matrixSize} x {matrixSize})</div>
    <div className="flex flex-row space-x-4 mb-10">
      <button className="w-1/2 sm:w-auto btn btn-secondary" onClick={() => setMatrixSize(matrixSize - 1)} disabled={matrixSize === 1}>-</button>
      <button className="w-1/2 sm:w-auto btn btn-secondary" onClick={() => setMatrixSize(matrixSize + 1)} disabled={matrixSize === 50}>+</button>
    </div>

    <button className="btn btn-danger w-full sm:w-auto" onClick={reset}>
      Reset
    </button>
  </>
)
