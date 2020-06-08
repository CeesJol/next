import React, { useState, useEffect, useContext } from "react";
import imageCompression from "browser-image-compression";
import ReactCrop from "react-image-crop";
import Button from "../Button";
import { createPost } from "../../pages/api/fauna";
import { UserContext } from "../../contexts/userContext";

export default function Add(props) {
  const [productUrl, setProductUrl] = useState("");
  const [status, setStatus] = useState("");
  const { getUser } = useContext(UserContext);
  const fileInput = React.createRef();
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleSetImage = async (event) => {
    setCrop({ aspect: 1 });
    setFile(await convert(event.target.files[0]));
  };
  const resetForm = () => {
    setProductUrl("");
    setStatus("");
    setFile(null);
		setCrop({ aspect: 1 });
		clearInputFile(document.getElementById("image"));
  };
  function clearInputFile(f) {
    if (f.value) {
      try {
        f.value = ""; //for IE11, latest Chrome/Firefox/Opera...
      } catch (err) {}
      if (f.value) {
        //for IE5 ~ IE10
        var form = document.createElement("form"),
          ref = f.nextSibling;
        form.appendChild(f);
        form.reset();
        ref.parentNode.insertBefore(f, ref);
      }
    }
  }
  /**
   * Crop image
   * @param {HTMLImageElement} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   */
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName;
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  }
  /**
   * Compress image
   */
  async function compressImg(imageFile) {
    // if (event) event.preventDefault();
    // const imageFile = event.target.files[0];
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.05,
      maxIteration: 100,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    // 100x smaller images in production
    if (process.env.NODE_ENV == "development") options.maxSizeMB = 0.0005;
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );

      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Convert image to BASE64
   */
  const convert = async (compressedFile) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(compressedFile);
    });
  };
  const getImage = () => document.getElementsByClassName("ReactCrop__image")[0];
  /**
   * Upload the post
   */
  const handleCreate = async (event) => {
    if (event) event.preventDefault();
    if (!crop || (crop && !crop.width)) {
      setStatus("Please upload and crop an image first");
      return;
    }
    // Crop, compress, convert to base64
    const croppedImg = await getCroppedImg(getImage(), crop, "hello");
    const compressedImg = await compressImg(croppedImg);
    const convertedImg = await convert(compressedImg);
    const imageUrl = convertedImg;
    // createPost(getUser(), productUrl, imageUrl).then(
    //   (data) => {
    setStatus("Created post successfully!");

    // Reset state
    resetForm();

    // Communicate refresh to Dashboard (parent)
    props.fn();
    // },
    // (err) => {
    //   setStatus("Something went wrong. Please try again later");
    //   console.log("err", err);
    // }
    // );
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
        <input
					type="file"
					id="image"
          accept="image/*"
          onChange={handleSetImage}
          ref={fileInput}
        />

        {status && <p>{status}</p>}

        {file && (
          <>
            <p>Crop the image to upload it</p>
            <div style={{ width: "40rem" }} id="test">
              <ReactCrop
                src={file}
                crop={crop}
                style={{ position: "relative" }}
                onChange={(newCrop) => {
                  setCrop(newCrop);
                }}
              />
              <br />
            </div>
          </>
        )}

        <Button text="Add new product" fn={handleCreate} />
      </form>
    </div>
  );
}
