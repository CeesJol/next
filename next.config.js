require('dotenv').config()
const withSass = require('@zeit/next-sass')
const webpack = require('webpack')

module.exports = withSass({
  webpack(config) {
    config.plugins.push(
      new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery': 'jquery',
      })
    )
    return config
  },
  env: {
		'FAUNADB_SECRET_KEY': process.env.FAUNADB_SECRET_KEY,
		'faunaDbGraphQlEndpoint': 'https://graphql.fauna.com/graphql'
  }
})