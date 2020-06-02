import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Add from "../components/dashboard/Add";
import Edit from "../components/dashboard/Edit";
import Product from "../components/dashboard/Product";
import Products from "../components/dashboard/Products";
import Settings from "../components/dashboard/Settings";
import UserContext from "../contexts/userContext";
import { getUserPosts } from "./api/fauna";

export default function Dashboard(props) {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [nav, setNav] = useState(0); // 0 = main, 1 = settings
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
        console.log('getposts data', data);
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
                  <div
                    className={
                      "dashboard__nav--item " +
                      (nav == 0 && " dashboard__nav--item-selected")
                    }
                    onClick={() => setNav(0)}
                  >
                    Products
                  </div>
                  <div
                    className={
                      "dashboard__nav--item " +
                      (nav == 1 && " dashboard__nav--item-selected")
                    }
                    onClick={() => setNav(1)}
                  >
                    Settings
                  </div>
                </div>
              </div>
              <div className="dashboard__main">
                <div className="dashboard__main__content">
                  {nav == 0 &&
                    (editingPost !== -1 ? (
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
                    ))}
                  {nav == 1 && <Settings />}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
