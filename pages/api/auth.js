import faunadb, { query as q } from "faunadb";

const secret = process.env.FAUNADB_SECRET_KEY;
const client = new faunadb.Client({ secret });

export const login = (email, password) =>
  client.query(
    q.Login(q.Match(q.Index("userByEmail"), email), {
      password,
    })
  );

export const signup = (email, password) =>
  client.query(
    q.Create(q.Collection("User"), {
      credentials: { password },
      data: {
        email,
      },
    })
  );

// create user
// const myQuery = client.query(
//   q.Create(
// 		q.Collection("User"),
// 		{
// 			credentials: { password: "secret password" },
// 			data: {
// 				username: "fqldude",
// 				email: "alice@site.example",
// 			},
// 		}
// 	)
// )

// const myQuery = client.query(
// 	q.Create(
// 		q.Collection('Field'),
// 		{ data: { testField: 'plswork' } }
// 	)
// )