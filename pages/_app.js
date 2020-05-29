import "../styles/index.scss";

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import UserContextProvider from '../contexts/userContext';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <div>
          <Head>
            // stuff.....
          </Head>
        </div>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </div>
    )
  }
}
export default MyApp