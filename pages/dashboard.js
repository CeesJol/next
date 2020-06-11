import React, { Component, useState, useEffect, useContext } from "react";
import Dashboard from "../components/dashboard/Dashboard"

import DashboardContextProvider from "../contexts/dashboardContext";

class DashboardPage extends Component {
  render() {
		const { Component, pageProps } = this.props;
		return (
    <DashboardContextProvider>
      <Dashboard {...pageProps} />
    </DashboardContextProvider>
		);
	}
}

export default DashboardPage;
