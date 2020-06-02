import { getUserPosts } from "./api/fauna";
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
      getUserPosts(username).then(
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
		console.log('data', data)
    if (!data) return <div>Loading...</div>;
    if (error || data === -1) return <div>Failed to load</div>;
    if (!data.user) return <div>404 - user not found</div>;

    const posts = data.user.posts.data;

    if (posts.length > 0)
      return posts.map((post, i) => (
        <Post key={i} imageUrl={post.imageUrl} productUrl={post.productUrl}>
          asfd
        </Post>
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
