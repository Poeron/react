import { useEffect, useState } from "react";
import { get, put } from "../../components/ApiHelper";
import ModalBill from "../../components/ModalBill";
import ViewBills from "../../components/ViewBills";

interface Bills {
  id: number;
  is_paid: boolean;
  full_name: string;
  bill_type: string;
  amount: number;
  period: string;
}

const Bills = () => {
  const [bills, setBills] = useState<Bills[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [selectedBillID, setSelectedBillID] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);

  const handleSelectedBillID = (id: number) => {
    setSelectedBillID(id);
  };
  const handleShow = (show: boolean) => {
    setShow(show);
  };
  const handleClose = () => setShow(false);

  const fetchBills = async () => {
    try {
      const url = `/api/User/GetBills`;
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
      const url = `/api/User/PayBill/?id=${selectedBillID}`;
      await put(url);
      handleClose();
      await fetchBills();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEr(error.message);
      } else {
        setEr("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

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
    <>
      <ViewBills
        bills={bills}
        handleSelectedBillID={handleSelectedBillID}
        handleShow={handleShow}
      />
      <ModalBill
        show={show}
        handleClose={handleClose}
        billId={selectedBillID}
        payBill={payBill}
      />
    </>
  );
};

export default Bills;
