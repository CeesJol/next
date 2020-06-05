import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Add from "../components/dashboard/Add";
import Edit from "../components/dashboard/Edit";
import Product from "../components/dashboard/Product";
import Products from "../components/dashboard/Products";
import Settings from "../components/dashboard/Settings";
import { UserContext } from "../contexts/userContext";
import { getUserPostsByEmail } from "./api/fauna";

export default function Dashboard(props) {
  const [data, setData] = useState(false);
	const [error, setError] = useState(false);
	const [req, setReq] = useState(false);
  const [nav, setNav] = useState(0); // 0 = main, 1 = settings
  const [editingPost, setEditingPost] = useState(-1);
	const { userExists, getUser, userUnauthenticated } = useContext(UserContext);
	
  useEffect(() => {
    if (userUnauthenticated()) {
		// if (!userExists()) {
      Router.push("/login");
		}

    if (!req && getUser() && getUser().email && !data && !error) {
			setReq(true);
      getPosts();
    }
  });
  function getPosts() {
    const user = getUser();
    console.log(`Req for ${user.email}`);
    getUserPostsByEmail(user.email).then(
      (data) => {
        setData(data);
      },
      (error) => {
				console.log("getposts error", error);
        setError(error);
      }
    );
  }
  function handleClick(e, post) {
    e.preventDefault();
    setEditingPost(post);
  }
  function handleMutation() {
    getPosts();
    setEditingPost(-1);
  }
  return (
    <>
      {userExists() && !userUnauthenticated() && (
        <div className="dashboard-container">
          <DashboardHeader />
          <main>
            <div className="dashboard">
              <div className="dashboard__nav">
                <div className="dashboard__nav__content">
                  <div
                    className={
                      "dashboard__nav--item " +
                      (nav === 0 && " dashboard__nav--item-selected")
                    }
                    onClick={() => setNav(0)}
                  >
                    Products
                  </div>
                  <div
                    className={
                      "dashboard__nav--item " +
                      (nav === 1 && " dashboard__nav--item-selected")
                    }
                    onClick={() => setNav(1)}
                  >
                    Settings
                  </div>
                </div>
              </div>

              <div className="dashboard__main">
                <div className="dashboard__main__content">
                  {userExists() && getUser().confirmed == false && (
                    <div className="dashboard__confirm">
                      Confirm your email address to see your store live
                    </div>
                  )}
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
