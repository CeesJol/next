import { getUser } from "./api/fauna";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserLayout from "../components/user/UserLayout";
import Post from "../components/user/Post";

export default function User() {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username && !data && !error) {
      console.log(`Req for ${username}`);
      getUser(username).then(
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
    if (!data.user) return <div>404 - user not found</div>;

    console.log(data);

    const posts = data.user.posts.data;

    if (posts.length > 0)
      return posts.map((post, i) => (
        <Post key={i}>asfd</Post>
      ));
    return <div>Nothing to see here</div>;
  }

  return (
    <UserLayout name={username}>
      <div className="usercontainer">
        <div className="user">
					<p>Press any image to learn more</p>
          <div id="posts-container">{drawItems()}</div>
        </div>
      </div>
    </UserLayout>
  );
}
