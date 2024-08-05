import React from "react";
import UserSidebar from "../components/UserSidebar"; // Adjust the import path if necessary
import { Outlet } from "react-router-dom";

const UserPage: React.FC = () => {
  return (
    <div className="container-fluid d-flex flex-wrap">
      <div className="d-flex flex-column flex-md-row w-100">
        <div className="sidebar flex-fill flex-md-shrink-0 col-12 col-md-2">
          <UserSidebar />
        </div>
        <div className="content flex-fill col-12 col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
