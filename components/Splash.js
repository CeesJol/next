import React from "react";

// import Image from "./image"
import Wave from "./Wave";
import Button from "./Button";

const Splash = () => (
  <>
    <div className="splash">
      <div className="splash__workable-content">
        <div className="splash__content">
          <div className="splash__left">
            <div>
              <h1 className="splash__content--title">
                Create an affiliate ecommerce store
              </h1>
              <p>
                Program name allows you to build a store and start earning with
                your Instagram page in minutes
              </p>
            </div>
            <footer>
              <Button />
            </footer>
          </div>
          <div className="splash__right">
            <img src="/images/undraw_order_confirmed_aaw7.svg" />
          </div>
        </div>
      </div>
    </div>
    <Wave />
  </>
);

export default Splash;
