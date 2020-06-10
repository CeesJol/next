import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Add from "../components/dashboard/Add";
import Edit from "../components/dashboard/Edit";
import Product from "../components/dashboard/Product";
import Products from "../components/dashboard/Products";
import Settings from "../components/dashboard/Settings";
import { UserContext } from "../contexts/userContext";
import { getUserProductsByEmail } from "./api/fauna";
import { identity } from "./api/auth";

export default function Dashboard(props) {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
	const [req, setReq] = useState(false);
	const [auth, setAuth] = useState(false);
  const [nav, setNav] = useState(0); // 0 = main, 1 = settings
  const [editingProduct, setEditingProduct] = useState(-1);
  const { getUser, clearUser } = useContext(UserContext);

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
                  {getUser() && getUser().confirmed == false && (
                    <div className="dashboard__confirm">
                      Confirm your email address to see your store live
                    </div>
                  )}
                  {nav == 0 &&
                    (editingProduct !== -1 ? (
                      <>
                        <Edit fn={handleMutation} product={editingProduct} />
                        <Product
                          data={data}
                          error={error}
                          handleClick={handleClick}
                          editingProduct={editingProduct}
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
