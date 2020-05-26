import React, { useState, useEffect } from "react";
import { myFunction } from "./api/fauna";

import styles from "../styles/styles.scss";

export default function Index() {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!data && !error) {
      myFunction().then(
        (data) => {
          setData(data);
        },
        (error) => {
          setError(error);
        }
      );
    }
  });

  function drawItems() {
    if (error) return <div>Failed to load</div>;
		if (!data) return <div>Loading...</div>;
		
		console.log(data);

    const entries = data.data.entries.data;

    if (entries.length == 0) return <div>Nothing to see here</div>;
    return entries.map((entry, i) => (
      <div key={i}>{i + " -> " + entry.testField}</div>
    ));
  }

  return (
    <div>
      <p className="example">Hello fuckface</p>
      {drawItems()}
    </div>
  );
}
