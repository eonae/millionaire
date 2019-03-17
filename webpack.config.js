var path = require('path');

module.exports = {
  entry: './src/frontend/js/app.js',
  output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'build')
  },
  mode: 'production',
  optimization: {
      minimize: false
  },
  resolve: {
    modules: [
      path.resolve('./src/frontend/js'),
      path.resolve('./node_modules')
    ]
  }
}