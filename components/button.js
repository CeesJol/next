import React from "react";
import Link from "next/link";

export default ({ text, fn }) => (
  <div className="button-container">
    {fn ? (
      <button onClick={fn} className="button">
        <a>{text ? text : "Start now"}</a>
      </button>
    ) : (
      <Link href="/login">
        <button className="button">
          <a>{text ? text : "Start now"}</a>
        </button>
      </Link>
    )}
  </div>
);
