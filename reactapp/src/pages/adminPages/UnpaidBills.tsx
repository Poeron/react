import React, { useEffect, useState } from "react";
import { get } from "../../components/ApiHelper";
import BillsList from "../../components/BillsList";

interface Bills {
  full_name: string;
  bill_type: string;
  amount: string;
  period: string;
}

const UnpaidBills = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
  const [bills, setBills] = useState<Bills[]>([]);
  const [period, setPeriod] = useState<string>("");

  const periods = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setEr(null);

        let url = `https://localhost:7082/api/Admin/GetMonthlyUnpaidBills?period=${period}`;

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
  }, [period]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (er && period !== "") {
    return (
      <div className="alert alert-danger" role="alert">
        {er}
      </div>
    );
  }

  return (
    <>
      <div>
        <label htmlFor="period">Dönem:</label>
        <select
          name="period"
          id="period"
          value={period}
          onChange={handlePeriodChange}
        >
          <option value="">Dönem Seçin</option>
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <BillsList title="Ödenmemiş Faturalar" bills={bills} />
    </>
  );
};

export default UnpaidBills;
