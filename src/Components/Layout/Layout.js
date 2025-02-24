import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"; 

const Layout = ({ labels, openModal }) => {
  return (
    <div className="layout">
      <Sidebar labels={labels} openModal={openModal} />
      <div className="content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
