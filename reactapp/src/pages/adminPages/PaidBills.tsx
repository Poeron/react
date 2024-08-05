import { useEffect, useState } from "react";
import { get } from "../../components/ApiHelper";
import BillsList from "../../components/BillsList";

interface Bills {
  full_name: string;
  bill_type: string;
  amount: string;
  period: string;
}

const PaidBills = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
  const [bills, setBills] = useState<Bills[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setEr(null);

        const url = `/api/Admin/GetPaidBills`;

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
      <BillsList title="Ödenmiş Faturalar" bills={bills} />
    </>
  );
};

export default PaidBills;
