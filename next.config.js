require('dotenv').config()

module.exports = {
  env: {
		'FAUNADB_SECRET_KEY': process.env.FAUNADB_SECRET_KEY,
		'FAUNADB_GRAPHQL_ENDPOINT': 'https://graphql.fauna.com/graphql',
		'EMAIL_SECRET': process.env.EMAIL_SECRET,
  }
}