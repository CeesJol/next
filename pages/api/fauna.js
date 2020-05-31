import useFetch from "../../lib/useFetch";

const secret = process.env.FAUNADB_SECRET_KEY;

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

export const myFunction = async () => {
  const query = `query AllUsers {
		users {
			data {
				username
				posts {
					data {
						imageUrl
						productUrl
					}
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
};

export const getUserPosts = async (username) => {
  const query = `query FindAUserByID {
		user(username: "${username}") {
			username
			posts {
				data {
					imageUrl
					productUrl
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
};

export const createPost = async (user, productUrl, imageUrl) => {
  const query = `mutation CreatePost {
		createPost(data: {
			imageUrl: "${imageUrl}"
			productUrl: "${productUrl}"
			user: { connect: "${user.id}" }
		}) {
			imageUrl
			productUrl
			user {
				username
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
};
