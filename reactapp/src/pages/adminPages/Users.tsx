import { useState } from "react";
import AddUser from "../../components/AddUser";
import EmptyApartmentList from "../../components/EmptyApartmentList";
import UserList from "../../components/UserList";

const User = () => {
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");
  return (
    <>
      <AddUser selectedApartmentId={selectedApartmentId} />
      <EmptyApartmentList onSelectApartment={setSelectedApartmentId} />
      <br />
      <hr />
      <br />
      <UserList />
    </>
  );
};

export default User;
