import wp from '@cypress/webpack-preprocessor'

export const webPackCypress = wp({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }]
    }
  }
})
