import React from "react";
import App from "next/app";
import Head from "next/head";
import UserContext from "../contexts/userContext";
import { identity } from "./api/auth";

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

    // Set localstorage
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };
  getUser = () => {
    return this.state.user;
  };
  clearUser = () => {
    // Reset state
    this.setState({ user: null });

    // Reset localstorage
    localStorage.removeItem("user");
  };
  userExists = () => {
    return this.state.user != null;
  };
  componentDidMount() {
		console.log('mount')
    if (this.state.user == null) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
				identity(user.secret).then((data) => {
					// Database confirms that user is logged in!
					this.setState({
						user,
					});
				}, (err) => {
					// Database denies that user is logged in!
					this.clearUser();
				})
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
