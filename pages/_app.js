import React from "react";
import App from "next/app";
import Head from "next/head";
import UserContext from "../contexts/userContext";

import "../styles/index.scss";

class MyApp extends App {
  state = {
    user: null,
  };
  storeUser = (user) => {
    this.setState(prevState => ({
			user: {
				...prevState.user,
				...user
			}
		}));
  };
  userExists = () => {
    return !!this.state.user;
  };
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
            userExists: this.userExists,
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </div>
    );
  }
}

export default MyApp;
