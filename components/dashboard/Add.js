import React, { useState, useEffect, useContext } from "react";

import Button from "../Button";

import { createPost } from "../../pages/api/fauna";

import UserContext from "../../contexts/userContext";

export default function Add(props) {
  const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { userExists, getUser } = useContext(UserContext);
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };
  const handleCreate = async (event) => {
    if (event) event.preventDefault();
    await createPost(getUser(), productUrl, imageUrl);

    // Communicate refresh to Dashboard (parent)
    props.fn();
  };
  return (
    <div className="dashboard__create">
      <h4 className="dashboard__create--title">Add a product</h4>
      <form>
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

        <Button text="Add new product" fn={handleCreate} />
      </form>
    </div>
  );
}