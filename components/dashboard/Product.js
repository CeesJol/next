import React from "react";
import Post from "../../components/user/Post";

export default (props) => {
  function drawItem(drawPost) {
    const data = props.data;
    const error = props.error;

    if (!data) return <div>Loading...</div>;
    if (error || data === -1) return <div>Failed to load</div>;
    if (!data.user) return <div>404 - user not found</div>;

    const posts = data.user.posts.data;

    if (posts.length > 0) {
      // TODO does find work for SEO does it even matter and stuff or am i just bitching
      const post = posts.find((post) => post._id == drawPost._id);
      if (!post) return <div>Something went wrong</div>;

      return (
        <a onClick={(e) => props.handleClick(e, post._id)} key={post._id}>
          <Post imageUrl={post.imageUrl} productUrl={post.productUrl}>
            asfd
          </Post>
        </a>
      );
    }
    return <div>Nothing to see here</div>;
  }

  return (
    <div className="dashboard__preview">
      <h4>Preview</h4>
      {drawItem(props.editingPost)}
    </div>
  );
};
