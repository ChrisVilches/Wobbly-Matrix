import React, { ReactElement } from 'react'
import MathJax from 'better-react-mathjax/MathJax'
import { MathJaxContext } from 'better-react-mathjax'

export const Step1 = (): ReactElement => (
  <MathJaxContext>
    <p className="my-4">
      Make a point follow the mouse.
    </p>
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
)
