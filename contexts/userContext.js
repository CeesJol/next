import React, { Component, createContext, useState, useEffect } from "react";
export const UserContext = createContext();

import { identity } from "../pages/api/auth";
import { readUser } from "../pages/api/fauna";

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLoggedOut, setUserLoggedOut] = useState(false);
  const storeUser = (data) => {
		// Set state
	  setUser((prevUser) => ({ ...prevUser, ...data }));

    setUserLoggedOut(false);
  };
  const getUser = () => {
    return user;
  };
  const clearUser = () => {
    // Reset localstorage
    localStorage.removeItem("user");

		// Reset state
		setUser(null);
    setUserLoggedOut(true);
  };
  const userExists = () => {
    return user != null;
  };
  const userUnauthenticated = () => {
    return userLoggedOut;
  };
  useEffect(() => {
    if (user == null) {
			console.log('no user')
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser != null) {
        identity(localUser.secret).then(
          (data) => {
            // Database confirms that user is logged in!
            storeUser(localUser);
            // Update user info
            readUser(localUser.id).then(
              (data) => {
                storeUser(data.findUserByID);
              },
              (err) => {
                console.log("Fucked up getting the user data", err);
              }
            );
          },
          (err) => {
						// Database denies that user is logged in!
						console.log("localUser", localUser)
            console.log("Your secret is fake news", err);
            clearUser();
          }
        );
      } else {
				// There is no user data
        clearUser();
      }
		}
		
		// Set localstorage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, userLoggedOut]);
  return (
    <UserContext.Provider
      value={{
        storeUser,
        getUser,
        clearUser,
        userExists,
        userUnauthenticated,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
