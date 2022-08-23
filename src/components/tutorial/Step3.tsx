import React, { ReactElement } from 'react'
import { MathContainer } from '@components/MathContainer'
import MathJax from 'better-react-mathjax/MathJax'

export const Step3 = (): ReactElement => (
  <>
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

    <MathContainer>
      <p className="my-4">
        Let <MathJax inline={true}>{'\\((C_i, C_j)\\)'}</MathJax> be the central cell (i.e. the one that follows the mouse),
        and assuming each cell has a size (width and height) of <MathJax inline={true}>{'\\(150\\)'}</MathJax>, then the
        offset <MathJax inline={true}>{'\\(\\overrightarrow{O}\\)'}</MathJax> for the point at
        the <MathJax inline={true}>{'\\((i, j)\\)'}</MathJax> position can be computed like so:
      </p>

      <MathJax>
      {'\\(\\overrightarrow{O} = 150 \\cdot (i - C_i, j - C_j)\\)'}
      </MathJax>
    </MathContainer>
  </>
)
