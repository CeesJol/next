import React from "react";
import Link from "next/link";

const Post = ({ imageUrl, productUrl, id }) => {
  const post = (
    <div className="post">
      <img src={imageUrl} />
    </div>
  );
  if (id) return post;
  return <a href={productUrl}>{post}</a>;
};

export default Post;
