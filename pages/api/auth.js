import faunadb, { query as q } from "faunadb";
import { validateSignup, validateLogin } from "../../lib/validate";

const secret = process.env.FAUNADB_SECRET_KEY;
const server = new faunadb.Client({ secret });

/** |----------------------------
 *  | AUTHENTICATE
 *  |----------------------------
 */
export const login = (email, password) => {
  const validationError = validateLogin(email, password);
  if (validationError) return Promise.reject(validationError);
  return server.query(
    q.Login(q.Match(q.Index("userByEmail"), email), {
      password,
    })
  );
};

/** |----------------------------
 *  | LOG OUT
 *  |----------------------------
 */
export const logout = (secret) => {
  const client = new faunadb.Client({ secret });
  return client.query(q.Logout(false));
};

/** |----------------------------
 *  | CREATE ACCOUNT
 *  |----------------------------
 */
export const signup = (email, username, password) => {
  const validationError = validateSignup(email, username, password);
  if (validationError) return Promise.reject(validationError);
  return server.query(
    q.Create(q.Collection("User"), {
      credentials: { password },
      data: {
        email,
				username,
				confirmed: false
      },
    })
  );
};

/** |----------------------------
 *  | VALIDATE USER'S SECRET
 *  |----------------------------
 */
export const identity = (secret) => {
  const client = new faunadb.Client({ secret });
  return client.query(q.Identity());
};
