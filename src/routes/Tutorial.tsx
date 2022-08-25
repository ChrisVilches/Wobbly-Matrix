import React, { ReactElement, useEffect } from 'react'
import { GridWrapper } from '@components/GridWrapper'
import { Params, useParams, useNavigate } from 'react-router-dom'
import { Step1 } from '@components/tutorial/Step1'
import { Step2 } from '@components/tutorial/Step2'
import { Step3 } from '@components/tutorial/Step3'
import { Step4 } from '@components/tutorial/Step4'
import tutorialData from '@config/tutorial.json'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ConditionIconLinkButton } from '@components/ConditionIconLinkButton'
import { motion } from 'framer-motion'

const transition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7 } },
  exit: { opacity: 0 }
}

const explanations = [
  Step1,
  Step2,
  Step3,
  Step4
]

const configurations = tutorialData.configurations
const titles = tutorialData.titles

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
        <GridWrapper {...configurations[currentStage - 1]} frameLimit={false} drawPoints={true}/>
      </div>
      <div className="md:col-span-7 col-span-12">
        <div className="flex flex-col h-full">
          <div className="text-cyan-700 font-semibold mb-4 text-sm uppercase">step #{currentStage}</div>
          <strong>{titles[currentStage - 1]}</strong>

          <motion.div
            {...transition}
            className="text-slate-700 grow">
            <Explanation />
          </motion.div>

          <div className="flex space-x-4 justify-center mt-14">
            <ConditionIconLinkButton enabled={canBack} to={`/tutorial/${currentStage - 1}`} icon={<ChevronLeftIcon className="h-6 w-6"/>} />
            <ConditionIconLinkButton enabled={canNext} to={`/tutorial/${currentStage + 1}`} icon={<ChevronRightIcon className="h-6 w-6"/>} />
          </div>
        </div>
      </div>
    </div>
  )
}
