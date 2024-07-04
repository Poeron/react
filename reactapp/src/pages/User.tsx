import React, { useState, useEffect } from "react";
import AddUser from "../components/AddUser";
import EmptyApartmentList from "../components/EmptyApartmentList";
import UserList from "../components/UserList";

const User = () => {
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");
  return (
    <>
      <UserList />
      <br />
      <hr />
      <br />
      <AddUser selectedApartmentId={selectedApartmentId} />
      <EmptyApartmentList onSelectApartment={setSelectedApartmentId} />
    </>
  );
};

export default User;
