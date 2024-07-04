import React, { useEffect, useState } from "react";

interface Bills {
  ad_soyad: string;
  fatura_turu: string;
  ucret: string;
  donem: string;
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
          url += `?donem=${period}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Bills[] = await response.json();
        setBills(data);
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
  }, [endpoint, period]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (er && (title !== "Ödenmemiş Faturalar" || period)) {
    return <div>An error occurred: {er}</div>;
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
            <option value="">Dönem seçin</option>
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
              <td>{bill.ad_soyad}</td>
              <td>{bill.fatura_turu}</td>
              <td>{bill.ucret}</td>
              <td>{bill.donem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BillsList;
