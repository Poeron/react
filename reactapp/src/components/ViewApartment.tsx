import React, { useEffect, useState } from "react";
import { get } from "./ApiHelper";
import { Table } from "react-bootstrap";

interface apartment {
  block: string;
  type: string;
  floor: number;
  apartment_number: number;
}
const ViewApartment = () => {
  const [apartment, setApartment] = useState<apartment>({} as apartment);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);

  useEffect(() => {
    fetchApartment();
  }, []);

  const fetchApartment = async () => {
    try {
      let url = `https://localhost:7082/api/User/GetApartmentInfo`;
      const response = await get(url);
      setApartment(response);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEr(error.message);
      } else {
        setEr("An unknown error occurred");
      }
    }
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
  if (er) {
    return (
      <div className="alert alert-danger" role="alert">
        {er}
      </div>
    );
  }

  return (
    <div className="bd-example table-responsive">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Özellik</th>
            <th scope="col">Değer</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary">
            <th scope="row">Blok</th>
            <td>{apartment.block}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">Tipi</th>
            <td>{apartment.type}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">Bulunduğu Kat</th>
            <td>{apartment.floor}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">Daire numarası</th>
            <td>{apartment.apartment_number}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ViewApartment;
