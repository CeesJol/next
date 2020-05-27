import { getUser } from "./api/fauna";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function User() {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const router =  useRouter();
	const { user } = router.query;

  useEffect(() => {
    if (user && !data && !error) {
			console.log(`Req for ${user}`);
      getUser(user).then(
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
    if (!data) return <div>Loading...</div>;
    if (error || data === -1) return <div>Failed to load</div>;

		const posts = data.user.posts.data;

    if (posts.length > 0)
      return posts.map((post, i) => (
        <div key={i}>{i + " -> " + post.title}</div>
      ));
    return <div>Nothing to see here</div>;
  }

  return (
    <>
      <div>Hi, {user}</div>
      {drawItems()}
    </>
  );
}
