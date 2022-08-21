import React, { useState, ReactElement } from 'react'
import { TipBox } from '@components/TipBox'
import { ConfigurationForm } from '@components/ConfigurationForm'
import { VisualizationPane } from '@components/VisualizationPane'

const defaultValues = {
  elasticity: 90,
  distWeight: 85,
  matrixSize: 7
}

export const HomePage = (): ReactElement => {
  const [elasticity, setElasticity] = useState(defaultValues.elasticity)
  const [distWeight, setDistWeight] = useState(defaultValues.distWeight)
  const [matrixSize, setMatrixSize] = useState(defaultValues.matrixSize)
  const [frameLimit, setFrameLimit] = useState(false)
  const [enlarged, setEnlarged] = useState(false)

  const reset = (): void => {
    setElasticity(defaultValues.elasticity)
    setDistWeight(defaultValues.distWeight)
    setMatrixSize(defaultValues.matrixSize)
  }

  return (
    <div style={{ margin: '50px' }}>
      <div className="grid grid-cols-12 gap-12">
        <div className={enlarged ? 'md:col-span-6 col-span-12' : 'md:col-span-5 col-span-12'}>
          <VisualizationPane {...{ elasticity, distWeight, matrixSize, frameLimit, setFrameLimit, enlarged, setEnlarged }}/>
        </div>
        <div className={enlarged ? 'md:col-span-6 col-span-12' : 'md:col-span-7 col-span-12'}>
          <TipBox text='For both parameters, the higher, the wobblier.'/>

          <ConfigurationForm {...{ elasticity, setElasticity, distWeight, setDistWeight, matrixSize, setMatrixSize, reset }}/>
        </div>
      </div>
    </div>
  )
}
