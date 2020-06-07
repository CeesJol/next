import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { updatePost, deletePost } from "../../pages/api/fauna";

export default function Edit(props) {
  const [productUrl, setProductUrl] = useState("");
	// const fileInput = React.createRef();
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleSave = async (event) => {
    // if (event) event.preventDefault();
    // updatePost(props.post._id, productUrl, imageUrl).then(
    //   (data) => {
    //     // Communicate refresh to Dashboard (parent)
    //     props.fn();
    //   },
    //   (err) => {
    //     console.log("err", err);
    //   }
		// );
		if (event) event.preventDefault();
		// const file = fileInput.current.files[0];
    // var reader = new FileReader();
    // reader.onloadend = function () {
		// 	console.log("Got result.");
			// const imageUrl = reader.result;
      updatePost(props.post._id, productUrl, props.post.imageUrl).then(
        (data) => {
					// Communicate refresh to Dashboard (parent)
					props.fn();
        },
        (err) => {
          console.log("err", err);
        }
      );
    // };
    // reader.readAsDataURL(file);
  };
  const handleDelete = async (event) => {
    if (event) event.preventDefault();
    deletePost(props.post._id).then(
      (data) => {
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
  }, []);
  return (
    <>
      <div className="dashboard__create">
        <h4 className="dashboard__create--title">Edit a product</h4>
        <form>
          <label>Product URL</label>
          <input
            type="text"
            id="productUrl"
            name="productUrl"
            value={productUrl}
            onChange={handleChangeProductUrl}
          />

          {/* <label>Image URL</label>
          <input type="file" ref={fileInput} /> */}

          {status && <p>{status}</p>}

          <Button text="Save" fn={handleSave} />
          <Button text="Delete" fn={handleDelete} color="red" />
        </form>
      </div>
    </>
  );
}
