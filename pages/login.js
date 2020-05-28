import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import LoginOptions from "../components/login-options";

import { auth } from "./api/auth"

export default function Login() {
	const [status, setStatus] = useState(null);
	const [secret, setSecret] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleAuth = (event) => {
		event.preventDefault();
		console.log('asdfasdfasf');
		setStatus('Authenticating...');
		auth(email, password).then((response) => {
			setStatus('Auth succeeded!')
			setSecret(response.secret);
		}, (err) => {
			setStatus('Auth failed')
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
		// 	handleAuth();
		// }
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="login">
					{/* <p>Secret: {secret}</p> */}
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

            <button onClick={handleAuth}>Test</button>

						{status && <p>Status: {status}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
