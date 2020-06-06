import executeQuery from "../../lib/executeQuery";

/** |----------------------------
 *  | GET POSTS BY USERNAME
 *  |----------------------------
 */
export const getUserPosts = async (username) => {
  return executeQuery(`query FindPostsByID {
		user(username: "${username}") {
			confirmed
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

/** |----------------------------
 *  | GET USERNAME BY EMAIL
 *  |----------------------------
 */
export const getUserByEmail = async (email) => {
  return executeQuery(`query FindAUserByEmail {
		userByEmail(email: "${email}") {
			username
			confirmed
		}
	}`);
};

/** |----------------------------
 *  | GET POSTS BY EMAIL
 *  |----------------------------
 */
export const getUserPostsByEmail = async (email) => {
  return executeQuery(`query FindPostsByEmail {
		userByEmail(email: "${email}") {
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

/** |----------------------------
 *  | CREATE POST
 *  |----------------------------
 */
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

/** |----------------------------
 *  | UPDATE POST
 *  |----------------------------
 */
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

/** |----------------------------
 *  | DELETE POST
 *  |----------------------------
 */
export const deletePost = async (id) => {
  return executeQuery(`mutation DeletePost {
		deletePost(id: "${id}") {
			imageUrl
			productUrl
		}
	}`);
};

/** |----------------------------
 *  | UPDATE USER
 *  |----------------------------
 */
export const updateUser = async (id, username, email, website) => {
  return executeQuery(`mutation UpdateUser {
		updateUser(id: "${id}", data:{
			username: "${username}"
			email: "${email}"
			website: "${website}"
		}) {
			username
			email
			website
		}
	}`);
};

/** |----------------------------
 *  | GET USER BY ID
 *  |----------------------------
 */
export const readUser = async (id) => {
  return executeQuery(`query FindAUserByID {
		findUserByID(id: "${id}") {
			username
			email
			confirmed
			website
		}
	}`);
};
