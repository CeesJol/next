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
}

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
	}`)
};

export const updatePost = async (id, productUrl, imageUrl) => {
  executeQuery(`mutation UpdatePost {
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
  executeQuery(`mutation deletePost {
		deletePost(id: "${id}") {
			imageUrl
			productUrl
		}
	}`);
};
