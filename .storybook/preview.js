import { withRouter } from 'storybook-addon-react-router-v6'
import '../src/styles.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  reactRouter: {
  }
}

export const decorators = [
  withRouter,
  Story => (
    <div>
      <Story/>
    </div>
  )
]
