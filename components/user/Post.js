import React from "react";

const Post = ({ imageUrl, productUrl, post, handleClick }) => {
  const thePost = (
    <div className="post">
      <img src={imageUrl} />
    </div>
	);
	// Dashboard version
  if (post)
    return (
      <a onClick={(e) => handleClick(e, post)} key={post._id}>
        {thePost}
      </a>
		);
	// Live version
  return <a href={productUrl}>{thePost}</a>;
};

export default Post;
