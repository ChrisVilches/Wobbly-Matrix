import React, { ReactElement, useEffect } from 'react'
import { GridWrapper } from '@components/GridWrapper'
import { Params, useParams, useNavigate, Link } from 'react-router-dom'
import MathJaxContext from 'better-react-mathjax/MathJaxContext'
import MathJax from 'better-react-mathjax/MathJax'

const configurations = [
  { cols: 1, rows: 1, elasticity: 0.0, distWeight: 0 },
  { cols: 1, rows: 1, elasticity: 0.97, distWeight: 0 },
  { cols: 5, rows: 5, elasticity: 0.97, distWeight: 0 },
  { cols: 5, rows: 5, elasticity: 0.97, distWeight: 0.002 }
]

const step1 = <>
  <p className="my-4">
    Make a point follow the mouse.
  </p>

  <MathJaxContext>
    <p className="my-4">
      Let <MathJax inline={true}>{'\\(P\\)'}</MathJax> be the point,
      and <MathJax inline={true}>{'\\(M\\)'}</MathJax> be the mouse position.
      Then, on every frame, you can make <MathJax inline={true}>{'\\(P\\)'}</MathJax> follow the mouse
      with this simple assignment:
    </p>
    <MathJax>
    {'\\(P \\leftarrow P + \\frac{\\overrightarrow{PM}}{5}\\)'}
    </MathJax>

    <p className="my-4">
      Note that <MathJax inline={true}>{'\\(5\\)'}</MathJax> can be any other positive constant.
      If you use <MathJax inline={true}>{'\\(1\\)'}</MathJax> the movement will be instantaneous.
    </p>
  </MathJaxContext>
</>

const step2 = <>
  <p className="my-4">
    Instead of simply following the mouse, make the point oscillate around the mouse.
  </p>

  <p className="my-4">
    <i>Under construction...</i>
  </p>

  <MathJaxContext>
  </MathJaxContext>
</>

const step3 = <>
  <p className="my-4">
    Add more points to the grid.
  </p>
  <p className="my-4">
    The movement of each point is independent from each other.
    The line segments drawn between pairs of points are simply for presentation.
  </p>
  <p className="my-4">
    Each point needs a position offset, which can be calculated from the cell in the grid it belongs to.
  </p>

  <MathJaxContext>
    <p className="my-4">
      Let <MathJax inline={true}>{'\\((C_i, C_j)\\)'}</MathJax> be the central cell (i.e. the one that follows the mouse),
      and assuming each cell has a size (width and height) of <MathJax inline={true}>{'\\(150\\)'}</MathJax>, then the
      offset <MathJax inline={true}>{'\\(\\overrightarrow{O}\\)'}</MathJax> for the point at
      the <MathJax inline={true}>{'\\((i, j)\\)'}</MathJax> position can be computed like so:
    </p>

    <MathJax>
    {'\\(\\overrightarrow{O} = 150 \\cdot (i - C_i, j - C_j)\\)'}
    </MathJax>
  </MathJaxContext>
</>

const step4 = <>
  <p className="my-4">
    In order to make the grid wobble and not just oscillate, the easiest way is to simply change some numbers involved
    in the movement in a way that&apos;s proportional to the distance from the central point.
  </p>

  <p className="my-4">
    Since the the movement of each point is controlled by the use of some constants, you can make the distance affect
    these numbers (by multiplying them). The result is that the points near the center will move differently from the
    points far from it.
  </p>

  <p className="my-4">
    There are multiple ways of achieving this effect.
  </p>
</>

const explanations = [
  step1,
  step2,
  step3,
  step4
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
  show: boolean
  to: string
  className: string
}

const ConditionIconLink = ({ icon, show, className, to }: ConditionLinkProps): ReactElement => {
  if (!show) {
    return <></>
  }

  return (
    <Link to={to}>
      <button className={`arrow-btn ${className}`}>
        {icon}
      </button>
    </Link>
  )
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

  return (
    <div className="grid grid-cols-12 xl:gap-12 gap-4">
      <div className="md:col-span-5 col-span-12">
        <GridWrapper {...configurations[currentStage - 1]} frameLimit={false} />
      </div>
      <div className="md:col-span-7 col-span-12">

        <strong>Step #{currentStage}: {titles[currentStage - 1]}</strong>

        <div className="block my-5 text-slate-600">
          {explanations[currentStage - 1]}
        </div>

        <div className="clear-both my-20"></div>

        {/** TODO: This should be done differently. Also make it responsive. Try to remove the "clear" */}
        <div className="block">
          <ConditionIconLink show={canBack} to={`/tutorial/${currentStage - 1}`} className="float-left" icon={<ChevronLeft />} />
          <ConditionIconLink show={canNext} to={`/tutorial/${currentStage + 1}`} className="float-right" icon={<ChevronRight />} />

          <div className="align-middle">
            {currentStage} / {configurations.length}
          </div>
        </div>
      </div>
    </div>
  )
}
