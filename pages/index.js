import React from "react";

import Arguments from "../components/arguments";
import Intro from "../components/intro";
import Contact from "../components/contact";
import CTA from "../components/cta";
import Demo from "../components/demo";
import Niche from "../components/niche";
import Splash from "../components/splash";
import Header from "../components/header";
import Footer from "../components/footer";

// import "normalize.css"
// import "../styles/index.scss";

const IndexPage = () => (
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

export default IndexPage;
