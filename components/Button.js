import React from "react";
import Link from "next/link";

export default ({ text, fn, color }) => {
  const className = color == "red" ? "button button--red" : "button";
  return (
    <div className="button-container">
      {fn ? (
        <button onClick={fn} className={className}>
          <a>{text ? text : "Start now"}</a>
        </button>
      ) : (
        <Link href="/login">
          <button className={className}>
            <a>{text ? text : "Start now"}</a>
          </button>
        </Link>
      )}
    </div>
  );
};
