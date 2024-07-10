import React, { useEffect, useState } from "react";
import { get } from "./ApiHelper";
import { Table } from "react-bootstrap";

interface user {
  full_name: string;
  national_id: string;
  email: string;
  phone: string;
}
const ViewUser = () => {
  const [user, setUser] = useState<user>({} as user);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let url = `https://localhost:7082/api/User/GetUserInfo`;
      const response = await get(url);
      setUser(response);
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
            <th scope="row">Ad Soyad</th>
            <td>{user.full_name}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">TCKN</th>
            <td>{user.national_id}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">E-mail</th>
            <td>{user.email}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">Telefon numarası</th>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ViewUser;
