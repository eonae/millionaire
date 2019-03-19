var path = require('path');

module.exports = {
  entry: './src/frontend/main.js',
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
      path.resolve('./src/frontend'),
      path.resolve('./node_modules')
    ]
  }
}