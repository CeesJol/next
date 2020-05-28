import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import LoginOptions from "../components/login-options";

import { login, signup } from "./api/auth"

export default function Login() {
	const [status, setStatus] = useState(null);
	const [secret, setSecret] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleLogin = (event) => {
		event.preventDefault();
		setStatus('Authenticating...');
		login(email, password).then((response) => {
			setStatus('Login succeeded!')
			setSecret(response.secret);
		}, (err) => {
			setStatus('Login failed')
		});
	}
	const handleSignUp = (event) => {
		event.preventDefault();
		setStatus('Creating account...');
		signup(email, password).then((response) => {
			setStatus('Logging in...')
			console.log('signup res:', response)
			login(email, password).then((response) => {
				setStatus('Login succeeded!')
				setSecret(response.secret);
			}, (err) => {
				setStatus('Login failed')
			});
		}, (err) => {
			setStatus('Signup failed')
		});
	}
	const handleChangeEmail = (event) => {
		setEmail(event.target.value)
	}
	const handleChangePassword = (event) => {
		setPassword(event.target.value)
	}
  useEffect(() => {
		// if (!status) {
		// 	handleLogin();
		// }
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="login">
          <form>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              onChange={handleChangeEmail}
            />

						<label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleChangePassword}
            />			

            <button onClick={handleLogin}>Log in</button>
						<button onClick={handleSignUp}>Sign up</button>

						{status && <p>Status: {status}</p>}
						{secret && <p>Secret: {secret}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
