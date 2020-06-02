import useFetch from "../../lib/useFetch";
import getData from "../../lib/getData";

const secret = process.env.FAUNADB_SECRET_KEY;

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
					_id
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

export const updatePost = async (id, productUrl, imageUrl) => {
  const query = `mutation UpdatePost {
		updatePost(id: "${id}", data:{
			imageUrl: "${imageUrl}"
			productUrl: "${productUrl}"
		}) {
			imageUrl
			productUrl
		}
	}`;
  const data = await useFetch(process.env.FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  return getData(data);
};

export const deletePost = async (id) => {
  const query = `mutation deletePost {
		deletePost(id: "${id}") {
			imageUrl
			productUrl
		}
	}`;
  const data = await useFetch(process.env.FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  return getData(data);
};
