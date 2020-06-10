import React from "react";
import Post from "../../components/user/Post";

export default (props) => {
  function drawItem(drawPost) {
    const data = props.data;
		const error = props.error;

    if (!data) return <p>Loading...</p>;
    if (error || data === -1) return <p>Failed to load</p>;
    if (!data.userByEmail) return <p>404 - user not found</p>;

    const posts = data.userByEmail.posts.data;

    if (posts.length > 0) {
      // TODO does find work for SEO does it even matter and stuff or am i just bitching
      const post = posts.find((post) => post._id == drawPost._id);
      if (!post) return <p>Something went wrong</p>;

      return (
				<Post imageUrl={post.imageUrl} productUrl={post.productUrl}>
					asfd
				</Post>
      );
    }
    return <p>Add a product to get started with your store</p>;
  }

  return (
    <div className="dashboard__preview">
      <h4>Preview</h4>
			<p>Preview of the product</p>
      {drawItem(props.editingPost)}
    </div>
  );
};
