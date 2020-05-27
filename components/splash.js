import React from "react"

// import Image from "./image"
import Wave from './wave';
import Button from './button';

const Splash = () => (
  <>
    <div className="container splash">
      <div className="splash__content">
        <div className="splash__left">
          <div>
            <h1 className="splash__content--title">
              Some really
              <br />
              large text
            </h1>
            <p>
              Adipisicing officia aute laborum ad nostrud pariatur. Non magna
              occaecat adipisicing voluptate aliqua nulla.
            </p>
          </div>
          <footer>
            <Button />
          </footer>
        </div>
        <div className="splash__right">
          <img src={"ex.png"} />
        </div>
      </div>
    </div>
    <Wave />
  </>
)

export default Splash
