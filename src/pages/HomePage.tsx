import React, { useState, ReactElement } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const scale = (min: number, max: number, n: number): number => {
  const length = max - min
  return min + (length * n / 100)
}

const scaleElasticity = (n: number): number => scale(0.1, 0.99, n)
const scaleDistWeight = (n: number): number => scale(0.0001, 0.003, n)
const defaultValues = {
  elasticity: 90,
  distWeight: 85,
  matrixSize: 7
}

export const HomePage = (): ReactElement => {
  const [elasticity, setElasticity] = useState(defaultValues.elasticity)
  const [distWeight, setDistWeight] = useState(defaultValues.distWeight)
  const [matrixSize, setMatrixSize] = useState(defaultValues.matrixSize)

  const reset = (): void => {
    setElasticity(defaultValues.elasticity)
    setDistWeight(defaultValues.distWeight)
    setMatrixSize(defaultValues.matrixSize)
  }

  return (
    <div style={{ margin: '50px' }}>
      <GridWrapper
        elasticity={scaleElasticity(elasticity)}
        distWeight={scaleDistWeight(distWeight)}
        rows={matrixSize}
        cols={matrixSize}/>

      <div>
        <i>For both parameters, the higher, the wobblier.</i>
      </div>

      <div>
        Elasticity:
        <Slider onChange={val => setElasticity(val as number)} value={elasticity}/>

        Deformation:
        <Slider onChange={val => setDistWeight(val as number)} value={distWeight}/>
      </div>

      <div>
        <button onClick={() => setMatrixSize(matrixSize - 1)} disabled={matrixSize === 1}>-</button>
        <button onClick={() => setMatrixSize(matrixSize + 1)}>+</button>
      </div>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
