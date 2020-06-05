import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "../../contexts/userContext";

const UserHeader = ({ name }) => {
  return (
    <header className="header userheader">
      <div className="header__content">
        <div className="header__left">
          <h3>
            <a
              href={`https://instagram.com/${name}`}
              className="header__title"
            >
              {name}
            </a>
          </h3>
        </div>
        <div className="header__right">
          {/* <h4>
          not sure what here
        </h4> */}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
