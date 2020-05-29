import faunadb, { query as q } from "faunadb";

import useFetch from "../../lib/useFetch";

/**
 * If no data is returned, or the server returns an error, return -1
 * Otherwise return the data
 */
function getData(data) {
	if (data.errors) {
		console.log(data.errors);
		return -1;
	}
  if (!data || data.errors) return -1;
  return data.data;
}

const secret = process.env.FAUNADB_SECRET_KEY;
const client = new faunadb.Client({ secret });

const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validate = (email, password) => {
  if (!email) {
    return "Please type in your email";
  } else if (!emailRegex.test(email)) {
    return "Please provide a valid email";
  } else if (!password) {
    return "Please create a password";
  } else if (password.length < 8) {
    return "Password is too short (min. 8 characters)";
  }
};

export const login = (email, password) => {
  const validationError = validate(email, password);
  if (validationError) return Promise.reject(validationError);
  return client.query(
    q.Login(q.Match(q.Index("userByEmail"), email), {
      password,
    })
  );
};

export const signup = (email, password) => {
  const validationError = validate(email, password);
  if (validationError) return Promise.reject(validationError);
  return client.query(
    q.Create(q.Collection("User"), {
      credentials: { password },
      data: {
        email,
      },
    })
  );
};

export const getUsername = async (email) => {
	const query = `query GetUser {
		userByEmail(email: "${email}") {
			username
			posts {
				data {
					title
				}
			}
		}
	}`;
	const size = 100;
  const data = await useFetch(process.env.FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  });

  return getData(data);
}

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
