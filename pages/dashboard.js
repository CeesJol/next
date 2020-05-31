import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import Add from "../components/dashboard/Add";
import Edit from "../components/dashboard/Edit";

import { createPost } from "./api/fauna";

import UserContext from "../contexts/userContext";

import { getUserPosts } from "./api/fauna";
import Post from "../components/user/Post";

export default function Dashboard(props) {
	const [data, setData] = useState(false);
	const [error, setError] = useState(false);
	const [editingPost, setEditingPost] = useState(false);
	
  const { userExists, getUser } = useContext(UserContext);
  useEffect(() => {
    if (!userExists()) {
      Router.push("/login");
		}
		
		if (getUser() && getUser().username && !data && !error) {
			getPosts();
		}
	});
	function getPosts() {
		const user = getUser();
		console.log(`Req for ${user.username}`);
		getUserPosts(user.username).then(
			(data) => {
				setData(data);
			},
			(error) => {
				setError(error);
			}
		);
	}
	function drawItems() {
		if (!data) return <div>Loading...</div>;
    if (error || data === -1) return <div>Failed to load</div>;
    if (!data.user) return <div>404 - user not found</div>;

    const posts = data.user.posts.data;

    if (posts.length > 0)
      return posts.map((post, i) => (
        <Post key={i} imageUrl={post.imageUrl} productUrl={post.productUrl}>
          asfd
        </Post>
      ));
    return <div>Nothing to see here</div>;
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
									{editingPost ? (
										<Edit />
									) : (
										<Add fn={getPosts} />
									)}
									<div className="dashboard__products">
										<h4>Your products</h4>
										<div id="posts-container">
											{drawItems()}
										</div>
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
