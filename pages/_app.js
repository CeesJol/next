import React from "react";
import App from "next/app";
import Head from "next/head";
import UserContext from "../contexts/userContext";
import { identity } from "./api/auth";
import { readUser } from "./api/fauna";

import "../styles/index.scss";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  storeUser = (user) => {
    // Set state
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        ...user,
      },
    }));

    this.state.user.loggedOut = false;

    // Set localstorage
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };
  getUser = () => {
    return this.state.user;
  };
  clearUser = () => {
    // Reset localstorage
    localStorage.removeItem("user");

    // Reset state
    this.setState(() => ({
      user: {
        loggedOut: true,
      },
    }));
  };
  userExists = () => {
    return this.state.user != null;
  };
  userUnauthenticated = () => {
		console.log('unauth', (this.state.user && this.state.user.loggedOut));
    return this.state.user && this.state.user.loggedOut;
  };
  componentDidMount() {
    console.log("mount");
    if (this.state.user == null) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        console.log("user", user);
        identity(user.secret).then(
          (data) => {
            // Database confirms that user is logged in!
            this.storeUser(user);
            // Update user info
            readUser(user.id).then(
              (data) => {
                console.log(data.findUserByID);
                this.storeUser(data.findUserByID);
                console.log(this.state);
              },
              (err) => {
                console.log("Fucked up getting the user data", err);
              }
            );
          },
          (err) => {
            // Database denies that user is logged in!
            console.log("Youre secret is fake news");
            this.clearUser();
          }
        );
      } else {
        // There is no user data
        console.log("no use");
        this.clearUser();
      }
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <div>
          <Head>
            <title>Project name</title>
          </Head>
        </div>
        <UserContext.Provider
          value={{
            user: this.state.user,
            storeUser: this.storeUser,
            clearUser: this.clearUser,
            userExists: this.userExists,
            userUnauthenticated: this.userUnauthenticated,
            getUser: this.getUser,
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </div>
    );
  }
}

export default MyApp;
