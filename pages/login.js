import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import LoginOptions from "../components/LoginOptions";
import Button from "../components/Button";

import { login, signup, getUsername } from "./api/auth";

import UserContext from "../contexts/userContext";

export default function Login() {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, userExists, storeUser } = useContext(UserContext);
  const handleLogin = (event) => {
    if (event) event.preventDefault();
    setStatus("Authenticating...");
    login(email, password).then(
      (res) => {
        setStatus("Login succeeded!");
        storeUser({
          secret: res.secret,
        });
        getUsername(email).then((data) => {
          storeUser({
            username: data.userByEmail.username,
            posts: data.userByEmail.posts,
          });
        });
        Router.push("/dashboard");
      },
      (err) => {
        setStatus(`Login failed: ${err}`);
      }
    );
  };
  const handleSignUp = (event) => {
    if (event) event.preventDefault();
    setStatus("Creating account...");
    signup(email, password).then(
      (res) => {
        handleLogin();
      },
      (err) => {
        setStatus(`Signup failed: ${err}`);
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
    if (userExists()) {
      // User is already logged in
      Router.push("/dashboard");
    }
  });

  return (
        <div className="login">
          <div className="login__box">
						<div className="login__box__content">
            <form>
							<h4 className="login__box--title">Program name</h4>
							<h4 className="login__box--subtitle">Create your Program name account</h4>
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
              <Button fn={handleSignUp} text="Sign up" />
            </form>
						</div>
          </div>
        </div>
  );
}
