import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "../../contexts/userContext";

const UserHeader = () => {
  return (
    <header
      className="userheader"
    >
      <div className="userheader__left">
        <h3>
          <Link href="/">
            <a className="userheader__title">Project name</a>
          </Link>
        </h3>
      </div>
      <div className="userheader__right">
        {/* <h4>
          not sure what here
        </h4> */}
      </div>
    </header>
  );
};

export default UserHeader;
