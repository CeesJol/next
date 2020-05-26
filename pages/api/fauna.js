// import faunadb, { query as q } from "faunadb";
import useFetch from '../../lib/useFetch'

const secret = process.env.FAUNADB_SECRET_KEY

export const myFunction = async () => {
  const query = `query FindAllTodos($size: Int) {
    entries(_size: $size) {
      data {
        _id
        testField
      }
    }
	}`
  const size = 100
  const data = await useFetch(process.env.faunaDbGraphQlEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
	})

  return data;
}
