import useFetch from "../../lib/useFetch";
import getData from "../../lib/getData";

const secret = process.env.FAUNADB_SECRET_KEY;

const executeQuery = async (query) => {
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

export const getUserPosts = async (username) => {
  return executeQuery(`query FindAUserByID {
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
	}`);
};

export const getUserPostsByEmail = async (email) => {
  return executeQuery(`query FindAUserByEmail {
		userByEmail(email: "${email}") {
			username
			posts {
				data {
					_id
					productUrl
					imageUrl
				}
			}
		}
	}`);
};

export const createPost = async (user, productUrl, imageUrl) => {
  return executeQuery(`mutation CreatePost {
		createPost(data: {
			imageUrl: "${imageUrl}"
			productUrl: "${productUrl}"
			user: { connect: "${user.id}" }
		}) {
			imageUrl
			productUrl
		}
	}`);
};

export const updatePost = async (id, productUrl, imageUrl) => {
  return executeQuery(`mutation UpdatePost {
		updatePost(id: "${id}", data:{
			imageUrl: "${imageUrl}"
			productUrl: "${productUrl}"
		}) {
			imageUrl
			productUrl
		}
	}`);
};

export const deletePost = async (id) => {
  return executeQuery(`mutation deletePost {
		deletePost(id: "${id}") {
			imageUrl
			productUrl
		}
	}`);
};

// User stuff below!
export const updateUser = async (id, username, email) => {
  return executeQuery(`mutation UpdateUser {
		updateUser(id: "${id}", data:{
			username: "${username}"
			email: "${email}"
		}) {
			username
			email
		}
	}`);
};

export const readUser = async (id) => {
  return executeQuery(`query FindAUserByID {
		findUserByID(id: "${id}") {
			username
			email
		}
	}`);
};
