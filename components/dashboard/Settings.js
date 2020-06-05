import React, { useState, useEffect, useContext } from "react";

import Button from "../Button";

import { updateUser } from "../../pages/api/fauna";
import { disconfirmUser } from "../../pages/api/confirm";

import UserContext from "../../contexts/userContext";

export default () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("");
	const { user, userExists, storeUser, getUser } = useContext(UserContext);
	const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
	};
	const handleSave = (event) => {
		if (event) event.preventDefault();
		updateUser(getUser().id, username, email).then(
      (data) => {
        console.log("data", data);

        // Communicate refresh to Dashboard (parent)
				// props.fn();

				// If email changed, set confirmed to false
				if (email !== getUser().email) {
					disconfirmUser(getUser().id)
					console.log('user disconfirmed');
				}
				
				// Update user locally
				storeUser({
					username: data.updateUser.username,
					email: data.updateUser.email,
				});

				setStatus('Updated successfully!');
      },
      (err) => {
        console.log("err", err);
      }
    );
	}
	useEffect(() => {
		if (!username && !email) {
			const user = getUser();
			setUsername(user.username);
			setEmail(user.email);
		}
	})
	
  return (
    <div className="dashboard__settings">
      <h4 className="dashboard__create--title">Settings</h4>
      <form>
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChangeUsername}
        />

        <label>E-mail address</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />

        {status && <p>Status: {status}</p>}

        <Button text="Save" fn={handleSave} />
      </form>
    </div>
  );
};
