import faunadb, { query as q } from "faunadb";
import validate from "../../lib/validate";

const secret = process.env.FAUNADB_SECRET_KEY;
const server = new faunadb.Client({ secret });

/** |----------------------------
 *  | AUTHENTICATE
 *  |----------------------------
 */
export const login = (email, password) => {
  const validationError = validate(email, password);
  if (validationError) return Promise.reject(validationError);
  return server.query(
    q.Login(q.Match(q.Index("userByEmail"), email), {
      password,
    })
  )
};

/** |----------------------------
 *  | LOG OUT
 *  |----------------------------
 */
export const logout = (user) => {
  const client = new faunadb.Client({ secret: user.secret });
  return client.query(q.Logout(false));
};

/** |----------------------------
 *  | CREATE ACCOUNT
 *  |----------------------------
 */
export const signup = (email, password) => {
  const validationError = validate(email, password);
  if (validationError) return Promise.reject(validationError);
  return server.query(
    q.Create(q.Collection("User"), {
      credentials: { password },
      data: {
        email,
      },
    })
  );
};
