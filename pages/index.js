import React from "react";

import Arguments from "../components/Arguments";
import Intro from "../components/Intro";
import CTA from "../components/CTA";
import Idea from "../components/Idea";
import Niche from "../components/Niche";
import Splash from "../components/Splash";
import Header from "../components/Header";
import Footer from "../components/Footer";

const IndexPage = () => {
  return (
    <>
      <Header transparentHeader={true} />
      <main>
        <Splash />
        <Intro />
        <Idea />
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
