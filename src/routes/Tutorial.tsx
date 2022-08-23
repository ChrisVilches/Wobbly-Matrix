import React, { ReactElement, useEffect } from 'react'
import { GridWrapper } from '@components/GridWrapper'
import { Params, useParams, useNavigate, Link } from 'react-router-dom'
import { Step1 } from '@components/tutorial/Step1'
import { Step2 } from '@components/tutorial/Step2'
import { Step3 } from '@components/tutorial/Step3'
import { Step4 } from '@components/tutorial/Step4'

// TODO: Refactor. This component is very messy (has a lot of lines)

const configurations = [
  { cols: 1, rows: 1, elasticity: 0.0, distWeight: 0 },
  { cols: 1, rows: 1, elasticity: 0.97, distWeight: 0 },
  { cols: 5, rows: 5, elasticity: 0.97, distWeight: 0 },
  { cols: 6, rows: 6, elasticity: 0.97, distWeight: 0.002 }
]

const explanations = [
  Step1,
  Step2,
  Step3,
  Step4
]

const titles = [
  'Follow the Mouse',
  'Add Oscillations',
  'More Points',
  'Grid Deformations'
]

const getStageFromParams = (params: Readonly<Params<string>>): number => {
  let value = 1

  if (typeof params.stage === 'string') {
    value = +params.stage
  }

  if (value >= 1 && value <= configurations.length) {
    return value
  }

  return -1
}

const ChevronLeft = (): ReactElement => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
  </svg>
)

const ChevronRight = (): ReactElement => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
)

interface ConditionLinkProps {
  icon: ReactElement
  enabled: boolean
  to: string
}

const ConditionIconLink = ({ icon, enabled, to }: ConditionLinkProps): ReactElement => {
  if (!enabled) {
    return (
      <button className="arrow-btn" disabled>
        {icon}
      </button>
    )
  }

  return (
    <Link to={to}>
      <button className="arrow-btn">
        {icon}
      </button>
    </Link>
  )
}

// TODO: Can I animate the stage change transition? (fadein/fadeout)
export const Tutorial = (): ReactElement => {
  const params = useParams()
  const navigate = useNavigate()

  const currentStage = getStageFromParams(params)

  const canBack = currentStage > 1
  const canNext = currentStage < configurations.length

  useEffect(() => {
    if (currentStage === -1) {
      return navigate('/tutorial')
    }
  }, [currentStage, navigate])

  if (currentStage === -1) {
    return <></>
  }

  const Explanation = explanations[currentStage - 1]

  return (
    <div className="grid grid-cols-12 xl:gap-12 gap-4">
      <div className="md:col-span-5 col-span-12 mb-8">
        <GridWrapper {...configurations[currentStage - 1]} frameLimit={false} />
      </div>
      <div className="md:col-span-7 col-span-12">
        <div className="mb-6">
          <div className="text-cyan-700 font-semibold mb-4 text-sm uppercase">step #{currentStage}</div>
          <strong>{titles[currentStage - 1]}</strong>
        </div>

        <div className="block mt-5 mb-12 text-slate-700">
          <Explanation />
        </div>

        <div className="flex space-x-4 justify-center">
          <ConditionIconLink enabled={canBack} to={`/tutorial/${currentStage - 1}`} icon={<ChevronLeft />} />
          <ConditionIconLink enabled={canNext} to={`/tutorial/${currentStage + 1}`} icon={<ChevronRight />} />
        </div>
      </div>
    </div>
  )
}
