const { alias } = require('../alias')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
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

/*
TODO: Some problems
(OK) CSS doesn't load. Cannot show the <Logo size={60}> component because it
depends on Tailwind CSS classes. Make sure the <Logo> component shows
correctly and other components with Tailwind also show correctly.

(OK) Ignored several files/folders in the eslint ignore file. Try to remove those
so they can be linted.

(OK) Ideally try to remove the webpack file in this folder.

(OK) Must have aliases written in tsconfig, craco config, and this file.
(craco config and this file can be recycled, because it's the same, so
extract to a standalone file, but still cumbersome lol)

(OK) Files in this folder (.storybook) are not linted. At least not with "npm run lint"

Could not install the Linter for Storybook, so maybe something will be
without the best practices.

Remove the extra files that were added automatically by Storybook (introduction mdx, Page, etc)

Learn how to use the "Actions" tab

Is it possible to separate .test files (Jest) into a different file? i.e. without using the
"play" function. Although it's fine this way.

----

I think that's pretty much it, but there may be some other problems as well,
(duplicated code, things that deviate from the best practices, etc)

*/
