import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "../../contexts/userContext";

const DashboardHeader = () => {
  const { user, userExists } = useContext(UserContext);
  useEffect(() => {
    // console.log('header user', user)
  });

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h3>
            <Link href="/dashboard">
              <a className="header__title">
                {userExists() ? user.username : "Loading..."}
              </a>
            </Link>
          </h3>
        </div>
        <div className="header__right">
          <h4>iets</h4>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
