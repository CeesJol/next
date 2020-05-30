import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import Button from "../components/Button"

export default function Dashboard() {
  return (
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
							<Button text="Add new product" fn={() => alert('hello world')}/>
						</div>
          </div>
        </div>
      </main>
    </div>
  );
}
