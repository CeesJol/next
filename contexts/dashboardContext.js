import React, { createContext, useState, useEffect } from "react";
export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  useEffect(() => {

	});
	const [nav, setNav] = useState(0); // 0 = main, 1 = settings
	const [editingProduct, setEditingProduct] = useState(-1);
  return (
    <DashboardContext.Provider
      value={{
				nav, setNav,
				editingProduct, setEditingProduct
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
