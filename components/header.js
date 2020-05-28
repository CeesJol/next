import React from "react";
import Link from "next/link";

const Header = ({ transparentHeader = false }) => (
  <header
    className={transparentHeader ? "header header--transparent" : "header"}
  >
    <div className="header__left">
      <h3>
        <Link href="/">
          <a className="header__title">Project name</a>
        </Link>
      </h3>
    </div>
    <div className="header__right">
      <h4>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </h4>
    </div>
  </header>
);

export default Header;
