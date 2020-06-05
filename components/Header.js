import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "../contexts/userContext";

const Header = ({ transparentHeader = false }) => {
  const { getUser, userExists } = useContext(UserContext);
  useEffect(() => {});

  return (
    <header
      className={transparentHeader ? "header header--transparent" : "header"}
    >
      <div className="header__content">
        <div className="header__left">
          <h3>
            <Link href="/">
              <a className="header__title">Project name</a>
            </Link>
          </h3>
        </div>
        <div className="header__right">
          <h4>
            {userExists() ? (
              <Link href="/dashboard">
                <a>{getUser().username}</a>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <a>Log in</a>
                </Link>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </>
            )}
          </h4>
        </div>
      </div>
    </header>
  );
};

export default Header;
