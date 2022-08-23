import { withProps } from '@hocs/withProps'
import MathJaxContext from 'better-react-mathjax/MathJaxContext'

export const MathContainer = withProps(MathJaxContext, { hideUntilTypeset: 'every' })
