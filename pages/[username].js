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
		if (!data) return <p>Loading...</p>;
		if (!data.user) return <p>404 - user not found</p>;
		if (!data.user.confirmed) return <p>Confirm your email address to see your store live</p>
    if (error || data === -1) return <p>Failed to load</p>;

    const posts = data.user.posts.data;

    if (posts.length > 0)
      return (
        <>
          <p>Press any image to learn more</p>
          {posts.map((post, i) => (
            <Post key={i} imageUrl={post.imageUrl} productUrl={post.productUrl}>
              asfd
            </Post>
          ))}
        </>
      );
    return <p>This user has no products yet</p>;
  }

  return (
    <UserLayout name={username}>
      <div className="usercontainer">
        <div className="user">
          <div id="posts-container">{drawItems()}</div>
        </div>
      </div>
    </UserLayout>
  );
}
