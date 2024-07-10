import React from "react";
import UserSidebar from "../components/UserSidebar"; // Adjust the import path if necessary
import { Outlet } from "react-router-dom";

const UserPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
