import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import UserContext from "../../contexts/userContext";

import { logout } from "../../pages/api/auth";

const DashboardHeader = () => {
  const { userExists, getUser, clearUser } = useContext(UserContext);
  const handleLogout = () => {
    logout(getUser()).then((data) => {
      if (data == true) {
      }
      clearUser();
      Router.push("/login");
    });
  };
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h3>
            <Link href="/dashboard">
              <a className="header__title">
                {userExists() ? getUser().username : "Loading..."}
              </a>
            </Link>
          </h3>
        </div>
        <div className="header__right">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
