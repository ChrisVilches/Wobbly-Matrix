const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@model': path.resolve(__dirname, 'src/model'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  }
}
