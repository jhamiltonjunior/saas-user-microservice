const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')

const { baseUrl, paths } = tsConfig.compilerOptions
for (path in paths) {
  paths[path][0] = paths[path][0]
    .replace('src', 'dist')
    .replace('.ts', '.js')
}

tsConfigPaths.register({ baseUrl, paths })
