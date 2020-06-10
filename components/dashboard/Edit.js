import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { updateProduct, deleteProduct } from "../../pages/api/fauna";

export default function Edit(props) {
  const [productUrl, setProductUrl] = useState("");
  const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleSave = async (event) => {
    if (event) event.preventDefault();
    await updateProduct(props.product._id, productUrl, props.product.imageUrl).then(
      (data) => {
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
    await deleteProduct(props.product._id).then(
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
    const product = props.product;
    setProductUrl(product.productUrl);
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

          {status && <p>{status}</p>}

          <Button text="Save" fn={handleSave} />
          <Button text="Delete" fn={handleDelete} color="red" />
        </form>
      </div>
    </>
  );
}
