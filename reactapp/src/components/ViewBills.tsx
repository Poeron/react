import React, { useEffect, useState } from "react";
import { get, put } from "./ApiHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalBill from "./ModalBill";

interface Bills {
  id: number;
  is_paid: boolean;
  full_name: string;
  bill_type: string;
  amount: number;
  period: string;
}

const ViewBills = () => {
  const [bills, setBills] = useState<Bills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
  const [selectedBillID, setSelectedBillID] = useState<number | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const billTypesConverted: Record<string, string> = {
    Gas: "Doğalgaz",
    Water: "Su",
    Electricity: "Elektrik",
    Dues: "Aidat",
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      let url = `https://localhost:7082/api/User/GetBills`;
      const response = await get(url);
      setBills(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEr(error.message);
      } else {
        setEr("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const payBill = async () => {
    try {
      let url = `https://localhost:7082/api/User/PayBill/?id=${selectedBillID}`;
      await put(url);
      fetchBills();
      handleClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEr(error.message);
      } else {
        setEr("An unknown error occurred");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <div className="container mt-4">
      <h2 className="mb-4">Tüm Faturalar</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Fatura Tipi</th>
            <th scope="col">Dönem</th>
            <th scope="col">Tutar</th>
            <th scope="col">Durum</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{billTypesConverted[bill.bill_type]}</td>
              <td>{bill.period}</td>
              <td>{bill.amount}</td>
              <td>
                {bill.is_paid ? (
                  <span className="badge bg-success">
                    <i className="bi bi-check-circle-fill"></i> Ödendi
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    <i className="bi bi-x-circle-fill"></i> Ödenmedi
                  </span>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className={
                    bill.is_paid
                      ? "btn btn-primary disabled"
                      : "btn btn-primary"
                  }
                  onClick={() => {
                    setSelectedBillID(bill.id);
                    handleShow();
                  }}
                >
                  Öde
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalBill
        show={show}
        handleClose={handleClose}
        billId={selectedBillID}
        payBill={payBill}
      />
    </div>
  );
};

export default ViewBills;
