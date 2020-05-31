import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import Button from "../components/Button";

import { createPost } from "./api/fauna";

import UserContext from "../contexts/userContext";

export default function Dashboard() {
	const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userExists, getUser } = useContext(UserContext);
  useEffect(() => {
    if (!userExists()) {
      Router.push("/login");
    }
	});
	const handleChangeProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
	};
	const handleCreate = (event) => {
		if (event) event.preventDefault();
		createPost(getUser(), productUrl, imageUrl)
	}
  return (
    <>
      {userExists() && (
        <div className="dashboard-container">
          <DashboardHeader />
          <main>
            <div className="dashboard">
              <div className="dashboard__nav">
                <div className="dashboard__nav__content">
                  <div className="dashboard__nav--item">hi there</div>
                  <div className="dashboard__nav--item">hi there2</div>
                  <div className="dashboard__nav--item">hi there3</div>
                </div>
              </div>
              <div className="dashboard__main">
                <div className="dashboard__main__content">
                  <div className="dashboard__create">
                    <form>
                      <h4 className="dashboard__create--title">
                        Add a product
                      </h4>
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

                      <Button
                        text="Add new product"
                        fn={handleCreate}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
