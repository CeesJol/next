// import React, { useContext, useEffect } from "react";
import React from "react";

import Arguments from "../components/Arguments";
import Intro from "../components/Intro";
import Contact from "../components/Contact";
import CTA from "../components/CTA";
import Demo from "../components/Demo";
import Niche from "../components/Niche";
import Splash from "../components/Splash";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import { UserContext } from "../contexts/userContext";

// import "normalize.css"
// import "../styles/index.scss";

const IndexPage = () => {
  // const { user, storeUser, userExists } = useContext(UserContext);
  // useEffect(() => {
  //   if (!userExists()) storeUser({ username: "testing!" });
  //   console.log("index page:", user);
  // });

  return (
    <>
      <Header transparentHeader={true} />
      <main>
        <Splash />
        <Intro />
        <Demo />
        <Arguments />
        <Niche />
        {/* <Contact /> */}
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default IndexPage;
