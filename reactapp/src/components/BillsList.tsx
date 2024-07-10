import React, { useEffect, useState } from "react";
import { get } from "./ApiHelper";

interface Bills {
  full_name: string;
  bill_type: string;
  amount: string;
  period: string;
}
interface Props {
  title: string;
  endpoint: string;
}

const BillsList = ({ title, endpoint }: Props) => {
  const [bills, setBills] = useState<Bills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
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
      setLoading(true);
      setEr(null);

      try {
        let url = `https://localhost:7082/api/Admin/${endpoint}`;
        if (period) {
          url += `?period=${period}`;
        }

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

  const billTypesConverted: Record<string, string> = {
    Gas: "Doğalgaz",
    Water: "Su",
    Electricity: "Elektrik",
    Dues: "Aidat",
  };

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

  if (er && (title !== "Ödenmemiş Faturalar" || period)) {
    return (
      <div className="alert alert-danger" role="alert">
        {er}
      </div>
    );
  }
  return (
    <>
      <h2>{title}</h2>
      {title === "Ödenmemiş Faturalar" && (
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
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Fatura Türü</th>
            <th>Ücret</th>
            <th>Dönem</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.full_name}</td>
              <td>{billTypesConverted[bill.bill_type]}</td>
              <td>{bill.amount}</td>
              <td>{bill.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BillsList;
