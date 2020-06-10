import React from "react";
import Product from "../../components/user/Product";

export default (props) => {
  function drawItems() {
    const data = props.data;
    const error = props.error;

    if (!data) return <p>Loading...</p>;
    if (error || data === -1) return <p>Failed to load</p>;
    if (!data.userByEmail) return <p>404 - user not found</p>;

    const products = data.userByEmail.products.data;

    if (products.length > 0)
      return (
        <>
          <p>Click on any product to edit it</p>
          {products.map((product, i) => (
            <Product
              key={i}
              imageUrl={product.imageUrl}
              productUrl={product.productUrl}
              product={product}
              handleClick={props.handleClick}
            >
              asfd
            </Product>
          ))}
        </>
      );
    return <p>Add a product to get started with your store</p>;
  }

  return (
    <div className="dashboard__products">
      <h4>Your products</h4>
      <div id="products-container">{drawItems()}</div>
    </div>
  );
};
