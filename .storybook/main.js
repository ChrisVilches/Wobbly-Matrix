const { alias } = require('../alias')

module.exports = {
  stories: [
    {
      directory: '../src/stories/components/',
      titlePrefix: 'Components',
      files: '*.stories.*'
    },
    {
      directory: '../src/stories/routes/',
      titlePrefix: 'Routes',
      files: '*.stories.*'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias
    }
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true
  }
}
