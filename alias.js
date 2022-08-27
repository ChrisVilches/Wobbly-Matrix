const tsconfig = require('./tsconfig.json')
const path = require('path')

/**
 * Copy from tsconfig.json
 */

const removeSlashAsterisk = str => str.replace(/\/\*$/, '')

const paths = tsconfig.compilerOptions.paths

const alias = {}

for (const k in paths) {
  const key = removeSlashAsterisk(k)
  const value = path.resolve(__dirname, 'src', removeSlashAsterisk(paths[k][0]))
  alias[key] = value
}

module.exports = {
  alias
}
