import React, { useState, ReactElement } from 'react'
import { TipBox } from '@components/TipBox'
import { ConfigurationForm } from '@components/ConfigurationForm'
import { VisualizationPane } from '@components/VisualizationPane'

const defaultValues = {
  elasticity: 90,
  distWeight: 85,
  matrixSize: 7
}

export const Home = (): ReactElement => {
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
    <div className="grid grid-cols-12 xl:gap-12 gap-4">
      <div className={enlarged ? 'xl:col-span-7 col-span-12' : 'xl:col-span-5 col-span-12'}>
        <div className="mb-16">
          <VisualizationPane {...{ elasticity, distWeight, matrixSize, frameLimit, setFrameLimit, enlarged, setEnlarged }}/>
        </div>
      </div>
      <div className={enlarged ? 'xl:col-span-5 col-span-12' : 'xl:col-span-7 col-span-12'}>
        <TipBox text='For both parameters, the higher, the wobblier.'/>

        <div className="mt-8">
          <ConfigurationForm {...{ elasticity, setElasticity, distWeight, setDistWeight, matrixSize, setMatrixSize, reset }}/>
        </div>
      </div>
    </div>
  )
}
