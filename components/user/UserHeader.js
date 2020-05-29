import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "../../contexts/userContext";

const UserHeader = ({ name }) => {
  return (
    <header className="userheader">
      <div className="userheader__content">
        <div className="userheader__left">
          <h3>
            <a
              href={`https://instagram.com/${name}`}
              className="userheader__title"
            >
              {name}
            </a>
          </h3>
        </div>
        <div className="userheader__right">
          {/* <h4>
          not sure what here
        </h4> */}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
