import executeQuery from "../../lib/executeQuery";

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

export const getUserByEmail = async (email) => {
  return executeQuery(`query FindAUserByEmail {
		userByEmail(email: "${email}") {
			username
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
