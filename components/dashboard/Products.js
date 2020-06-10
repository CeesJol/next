import React from "react";
import Post from "../../components/user/Post";

export default (props) => {
  function drawItems() {
    const data = props.data;
    const error = props.error;

    if (!data) return <p>Loading...</p>;
    if (error || data === -1) return <p>Failed to load</p>;
    if (!data.userByEmail) return <p>404 - user not found</p>;

    const posts = data.userByEmail.posts.data;

    if (posts.length > 0)
      return (
        <>
          <p>Click on any product to edit it</p>
          {posts.map((post, i) => (
            <Post
              key={i}
              imageUrl={post.imageUrl}
              productUrl={post.productUrl}
              post={post}
              handleClick={props.handleClick}
            >
              asfd
            </Post>
          ))}
        </>
      );
    return <p>Add a product to get started with your store</p>;
  }

  return (
    <div className="dashboard__products">
      <h4>Your products</h4>
      <div id="posts-container">{drawItems()}</div>
    </div>
  );
};
