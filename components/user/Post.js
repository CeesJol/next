import React from "react"
import Link from "next/link"

const Post = ({imageUrl, productUrl}) => (
	<a href={productUrl}>
<div className="post">
		<img src={imageUrl} />
	</div>
	</a>
  
)

export default Post
