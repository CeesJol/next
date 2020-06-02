import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import Add from "../components/dashboard/Add";
import Edit from "../components/dashboard/Edit";
import Product from "../components/dashboard/Product";
import Products from "../components/dashboard/Products";

import { createPost } from "./api/fauna";

import UserContext from "../contexts/userContext";

import { getUserPosts } from "./api/fauna";
import Post from "../components/user/Post";

export default function Dashboard(props) {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [editingPost, setEditingPost] = useState(-1);

  const { userExists, getUser } = useContext(UserContext);
  useEffect(() => {
    if (!userExists()) {
      Router.push("/login");
    }

    if (getUser() && getUser().username && !data && !error) {
      getPosts();
    }
  }, [data, error]);
  function getPosts() {
    const user = getUser();
    console.log(`Req for ${user.username}`);
    getUserPosts(user.username).then(
      (data) => {
        console.log(data);
        setData(data);
      },
      (error) => {
        setError(error);
      }
    );
  }
  function handleClick(e, post) {
    e.preventDefault();
    console.log("The link was clicked.", post);
    setEditingPost(post);
  }
  function handleMutation() {
    getPosts();
    setEditingPost(-1);
  }
  return (
    <>
      {userExists() && (
        <div className="dashboard-container">
          {console.log("yup it rendered")}
          <DashboardHeader />
          <main>
            <div className="dashboard">
              <div className="dashboard__nav">
                <div className="dashboard__nav__content">
                  <div className="dashboard__nav--item">Products</div>
                  <div className="dashboard__nav--item">Settings</div>
                  {/* <div className="dashboard__nav--item">hi there3</div> */}
                </div>
              </div>
              <div className="dashboard__main">
                <div className="dashboard__main__content">
                  {editingPost !== -1 ? (
                    <>
                      <Edit fn={handleMutation} post={editingPost} />
                      <Product
                        data={data}
                        error={error}
                        handleClick={handleClick}
                        editingPost={editingPost}
                      />
                    </>
                  ) : (
                    <>
                      <Add fn={getPosts} />
                      <Products
                        data={data}
                        error={error}
                        handleClick={handleClick}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
