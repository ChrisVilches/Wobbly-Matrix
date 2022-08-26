const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    // '@storybook/addon-interactions'
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@model': path.resolve(__dirname, '../src/model'),
      '@interfaces': path.resolve(__dirname, '../src/interfaces'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@hocs': path.resolve(__dirname, '../src/hocs'),
      '@util': path.resolve(__dirname, '../src/util')
    }
    return config
  },
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5",
    disableTelemetry: true
  }
}

/*
TODO: Some problems
Must have aliases written in tsconfig, craco config, and this file.
(craco config and this file can be recycled, because it's the same, so
extract to a standalone file, but still cumbersome lol)

CSS doesn't load. Cannot show the <Logo size={60}> component because it
depends on Tailwind CSS classes. Make sure the <Logo> component shows
correctly and other components with Tailwind also show correctly.

Could not install the Linter for Storybook, so maybe something will be
without the best practices.

Ignored several files/folders in the eslint ignore file. Try to remove those
so they can be linted.

Ideally try to remove the webpack file in this folder.

Remove the extra files that were added automatically by Storybook (introduction mdx, Page, etc)

Learn how to use the "Actions" tab

Is it possible to separate .test files (Jest) into a different file? i.e. without using the
"play" function. Although it's fine this way.

Files in this folder (.storybook) are not linted. At least not with "npm run lint"

----

I think that's pretty much it, but there may be some other problems as well,
(duplicated code, things that deviate from the best practices, etc)

*/
