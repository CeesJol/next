import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";

import Button from "../components/Button";

import { login } from "./api/auth";
import { getUserByEmail } from "./api/fauna";
import { sendConfirmationEmail } from "./api/confirm";

import { UserContext } from "../contexts/userContext";

export default function Login() {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userExists, storeUser, userUnauthenticated } = useContext(UserContext);
  const handleLogin = (event) => {
    if (event) event.preventDefault();
    setStatus("Authenticating...");
    login(email, password).then(
      (res) => {
				setStatus("Login succeeded!");
				console.log(res.instance.value);
				const id = res.instance.value.id;
        storeUser({
          id,
					secret: res.secret,
					email
				});
        getUserByEmail(email).then((data) => {
					console.log('getUserByEmail', data);
          storeUser({
						username: data.userByEmail.username,
						confirmed: data.userByEmail.confirmed
					});
					if (!data.userByEmail.confirmed) {
						sendConfirmationEmail(id, email);
					}
					Router.push("/dashboard");
        }, (err) => {
					setStatus(`Login failed: ${err}`);
				});
      },
      (err) => {
        setStatus(`Login failed: ${err}`);
      }
    );
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    if (userExists() && !userUnauthenticated()) {
      // User is already logged in
      Router.push("/dashboard");
    }
  });

  return (
    <div className="login">
      <div className="login__box">
        <div className="login__box__content">
          <form>
            <h4 className="login__box--title">Affilas</h4>
            <h4 className="login__box--subtitle">
              Log in with your email address and password
            </h4>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />

            {status && <p>Status: {status}</p>}

            <Button fn={handleLogin} text="Log in" />
          </form>
        </div>
      </div>
			<p>Don't have an account yet? <Link href="/signup"><a>Sign up</a></Link></p>
    </div>
  );
}
