import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";

import Button from "../Button";

import { updatePost, deletePost } from "../../pages/api/fauna";

import UserContext from "../../contexts/userContext";

import { getUserPosts } from "../../pages/api/fauna";
// import { useRouter } from "next/router";
import Post from "../user/Post";

export default function Edit(props) {
  const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { userExists, getUser } = useContext(UserContext);
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };
  const handleSave = async (event) => {
    if (event) event.preventDefault();
    updatePost(props.post._id, productUrl, imageUrl).then(
      (data) => {
        console.log("data", data);

        // Communicate refresh to Dashboard (parent)
        props.fn();
      },
      (err) => {
        console.log("err", err);
      }
    );
  };
  const handleDelete = async (event) => {
    if (event) event.preventDefault();
    deletePost(props.post._id).then(
      (data) => {
        console.log("data", data);

        // Communicate refresh to Dashboard (parent)
        props.fn();
      },
      (err) => {
        console.log("err", err);
      }
    );
  };
  useEffect(() => {
    const post = props.post;
    setProductUrl(post.productUrl);
		setImageUrl(post.imageUrl);
		console.log('fn', props.fn);
  }, []);
  return (
    <>
      <div className="dashboard__create">
        <form>
          <h4 className="dashboard__create--title">Edit a product</h4>
          <label>Product URL</label>
          <input
            type="text"
            id="productUrl"
            name="productUrl"
            value={productUrl}
            onChange={handleChangeProductUrl}
          />

          <label>Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChangeImageUrl}
          />

          {status && <p>Status: {status}</p>}

          <Button text="Save" fn={handleSave} />
          <Button text="Delete" fn={handleDelete} />
        </form>
      </div>
    </>
  );
}
