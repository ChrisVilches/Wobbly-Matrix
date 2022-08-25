const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@model': path.resolve(__dirname, 'src/model'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@hocs': path.resolve(__dirname, 'src/hocs'),
      '@util': path.resolve(__dirname, 'src/util')
    }
  }
}
