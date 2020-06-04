import jwt from "jsonwebtoken";
import faunadb, { query as q } from "faunadb";

const secret = process.env.FAUNADB_SECRET_KEY;
const server = new faunadb.Client({ secret });

export const confirm = (token) => {
  try {
    // Decode the token
    var decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    console.log("decoded", decoded.id);

    // If it went well, send info to database
    return confirmUser(decoded.id);
  } catch (e) {
    console.log(e);
  }
};

/** |----------------------------
 *  | CONFIRM USER'S EMAIL
 *  |----------------------------
 */
export const confirmUser = (id) => {
  return server.query(
    q.Update(q.Ref(q.Collection("User"), `${id}`), {
      data: {
        confirmed: true,
      },
    })
  );
};

/** |----------------------------
 *  | DISCONFIRM USER'S EMAIL
 *  |----------------------------
 */
export const disconfirmUser = (id) => {
  return server.query(
    q.Update(q.Ref(q.Collection("User"), `${id}`), {
      data: {
        confirmed: false,
      },
    })
  );
};

export const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const sendConfirmationEmail = async (id) => {
  const token = generateToken(id);

  // Send mail
  // ...

  console.log("token", token);
	console.log("it should now send an email lol");
};
