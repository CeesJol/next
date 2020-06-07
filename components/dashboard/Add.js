import React, { useState, useEffect, useContext } from "react";
import imageCompression from 'browser-image-compression';
import Button from "../Button";
import { createPost } from "../../pages/api/fauna";
import { UserContext } from "../../contexts/userContext";

export default function Add(props) {
  const [productUrl, setProductUrl] = useState("");
  const [status, setStatus] = useState("");
  const { getUser } = useContext(UserContext);
	const fileInput = React.createRef();
	const [file, setFile] = useState(null);
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
	};
	/**
	 * Compress image
	 */
	async function handleImageUpload(event) {
		if (event) event.preventDefault();
		const imageFile = event.target.files[0];
		console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 0.05,
			maxIteration: 100,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		}
		try {
			const compressedFile = await imageCompression(imageFile, options);
			console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
			console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

			setFile(compressedFile);
		} catch (error) {
			console.log(error);
		}

	}
	/**
	 * Convert image to BASE64 and upload it
	 */
  const handleCreate = async (event) => {
		if (event) event.preventDefault();
		// const file = fileInput.current.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
			console.log("Got result.");
			const imageUrl = reader.result;
			console.log(imageUrl.length);
      createPost(getUser(), productUrl, imageUrl).then(
        (data) => {
					setStatus("Created post successfully!");
					
					// Communicate refresh to Dashboard (parent)
					props.fn();
        },
        (err) => {
          setStatus("Something went wrong. Please try again later");
          console.log("err", err);
        }
      );
    };
    reader.readAsDataURL(file);
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

        <label>Image</label>
        <input type="file" accept="image/*" onChange={event => handleImageUpload(event)} ref={fileInput} />

        {status && <p>{status}</p>}

        <Button text="Add new product" fn={handleCreate} />
      </form>
    </div>
  );
}
