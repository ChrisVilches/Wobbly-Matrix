import React, { useState, ReactElement } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { TipBox } from '@components/TipBox'
import { ZoomIcon } from '@components/ZoomIcon'

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
  const [enlarged, setEnlarged] = useState(false)

  const reset = (): void => {
    setElasticity(defaultValues.elasticity)
    setDistWeight(defaultValues.distWeight)
    setMatrixSize(defaultValues.matrixSize)
  }

  const cols = enlarged ? 6 : 5

  return (
    <div style={{ margin: '50px' }}>
      <div className="grid grid-cols-12 gap-12">
        <div className={`md:col-span-${cols} col-span-12`}>
          <GridWrapper
          elasticity={scaleElasticity(elasticity)}
          distWeight={scaleDistWeight(distWeight)}
          rows={matrixSize}
          cols={matrixSize}/>
        </div>
        <div className={`md:col-span-${12 - cols} col-span-12`}>
          <TipBox text='For both parameters, the higher, the wobblier.'/>

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
        </div>
      </div>

      <div className="mt-4">
        <button className="md:inline hidden btn btn-primary" onClick={() => setEnlarged(!enlarged)}>
          <ZoomIcon zoomedIn={enlarged}/>
        </button>
      </div>
    </div>
  )
}
