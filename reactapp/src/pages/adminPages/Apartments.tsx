import React from "react";
import ApartmentList from "../../components/ApartmentList";
import AddApartment from "../../components/AddApartment";

const Apartment = () => {
  return (
    <>
      <ApartmentList />
      <br />
      <hr />
      <br />
      <AddApartment />
    </>
  );
};

export default Apartment;
