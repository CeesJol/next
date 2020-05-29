import React from "react";
import Link from "next/link";

export default ({ text, fn }) => (
  <div className="button-container">
    <Link href="/login">
      <button onClick={fn} className="button">
        <a>{text ? text : "Start now"}</a>
      </button>
    </Link>
  </div>
);
