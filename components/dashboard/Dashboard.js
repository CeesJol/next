import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import DashboardHeader from "./DashboardHeader";
import Add from "./Add";
import Edit from "./Edit";
import Product from "./Product";
import Products from "./Products";
import Settings from "./Settings";
import Nav from "./Nav";
import { UserContext } from "../../contexts/userContext";
import { DashboardContext } from "../../contexts/dashboardContext";
import { getUserProductsByEmail } from "../../pages/api/fauna";
import { identity } from "../../pages/api/auth";

export default function Dashboard(props) {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
	const [req, setReq] = useState(false);
	const [auth, setAuth] = useState(false);
	const { getUser, clearUser } = useContext(UserContext);
	const { nav, editingProduct, setEditingProduct } = useContext(DashboardContext);

  useEffect(() => {
		const user = getUser();
    if (!auth && user && user.secret) {
      identity(user.secret).then(
        (data) => {
					console.log("id data", data);
					setAuth(true);
        },
        (err) => {
					console.log("id err", err);
					clearUser();
					Router.push("/login");
        }
      );
		}

		console.log('nav', nav);

    if (!req && user && user.email && !data && !error) {
      setReq(true);
      getProducts();
    }
  });
  function getProducts() {
    const user = getUser();
    console.log(`Req for ${user.email}`);
    getUserProductsByEmail(user.email).then(
      (data) => {
        setData(data);
      },
      (error) => {
        console.log("getproducts error", error);
        setError(error);
      }
    );
  }
  function handleClick(e, product) {
    e.preventDefault();
    setEditingProduct(product);
  }
  function handleMutation() {
    getProducts();
    setEditingProduct(-1);
  }
  return (
    <>
      {auth ? (
        <div className="dashboard-container">
          <DashboardHeader />
          <main>
            <div className="dashboard">
              <Nav />
              <div className="dashboard__main">
                <div className="dashboard__main__content">
                  {getUser() && getUser().confirmed == false && (
                    <div className="dashboard__confirm">
                      Confirm your email address to see your store live
                    </div>
                  )}
                  {nav == 0 &&
                    (editingProduct !== -1 ? (
                      <>
                        <Edit fn={handleMutation} />
                        <Product
                          data={data}
                          error={error}
                          handleClick={handleClick}
                        />
                      </>
                    ) : (
                      <>
                        {getUser() && getUser().confirmed == true && (
                          <div className="dashboard__live">
                            View{" "}
                            <a href={getUser().username} target="_blank">
                              your store
                            </a>{" "}
                            live
                          </div>
                        )}
                        <Add fn={getProducts} />
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
      ) : (
				<p>Authenticating...</p>
			)}
    </>
  );
}
