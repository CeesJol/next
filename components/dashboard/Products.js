import React from "react";
import Post from "../../components/user/Post";

export default (props) => {
  function drawItems() {
    const data = props.data;
    const error = props.error;

    if (!data) return <div>Loading...</div>;
    if (error || data === -1) return <div>Failed to load</div>;
    if (!data.user) return <div>404 - user not found</div>;

    const posts = data.user.posts.data;

    if (posts.length > 0)
      return posts.map((post, i) => (
        <a onClick={(e) => props.handleClick(e, post)} key={post._id}>
          <Post
            key={i}
            imageUrl={post.imageUrl}
            productUrl={post.productUrl}
            id={post._id}
          >
            asfd
          </Post>
        </a>
      ));
    return <div>Nothing to see here</div>;
  }

  return (
    <div className="dashboard__products">
      <h4>Your products</h4>
      <div id="posts-container">{drawItems()}</div>
    </div>
  );
};
