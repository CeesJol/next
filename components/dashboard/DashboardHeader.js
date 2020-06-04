import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import UserContext from "../../contexts/userContext";

import { logout } from "../../pages/api/auth";

const DashboardHeader = () => {
  const { userExists, getUser, clearUser } = useContext(UserContext);
  const handleLogout = () => {
    logout(getUser().secret).then((data) => {
      clearUser();
      Router.push("/login");
    });
  };
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h3>
						<a className="header__title" onClick={Router.reload}>
							{userExists() ? getUser().username : "Loading..."}
						</a>
          </h3>
        </div>
        <div className="header__right">
          <a onClick={handleLogout}>Log out</a>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
