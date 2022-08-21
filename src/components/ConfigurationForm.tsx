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

    <div className="parameter-label">Deformation</div>
    <Slider onChange={val => setDistWeight(val as number)} value={distWeight}/>

    <div className="parameter-label">Matrix size ({matrixSize} x {matrixSize})</div>
    <button className="btn btn-secondary" onClick={() => setMatrixSize(matrixSize - 1)} disabled={matrixSize === 1}>-</button>
    <button className="btn btn-secondary" onClick={() => setMatrixSize(matrixSize + 1)}>+</button>

    <div className="clear-both my-10"></div>

    <button className="btn btn-danger" onClick={reset}>
      Reset
    </button>
  </>
)
