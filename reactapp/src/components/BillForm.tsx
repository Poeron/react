import React, { useState, ChangeEvent, FormEvent } from "react";

interface BillData {
  bill_type: string;
  amount: string;
  period: string;
}
interface Props {
  selectedUserIds: number[];
}

const BillForm = ({ selectedUserIds }: Props) => {
  const [formData, setFormData] = useState<BillData>({
    bill_type: "",
    amount: "",
    period: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        bill: {
          bill_type: billTypesConverted[formData.bill_type],
          amount: parseInt(formData.amount, 10),
          period: formData.period,
        },
        user_ids: selectedUserIds,
      };

      if (isNaN(payload.bill.amount)) {
        throw new Error("Invalid value for 'Amount'");
      }

      const response = await fetch("https://localhost:7082/api/Admin/AddBill", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Form submitted successfully!");
      // Additional actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    fieldName: keyof BillData
  ) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const billTypes = ["Aidat", "Su", "Doğalgaz", "Elektrik"];
  const billTypesConverted: Record<string, string> = {
    Aidat: "Dues",
    Su: "Water",
    Doğalgaz: "Gas",
    Elektrik: "Electricity",
  };

  const months = [
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

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <select
          className="form-control"
          aria-label="Fatura Türü"
          onChange={(e) => handleInputChange(e, "bill_type")}
          value={formData.bill_type}
        >
          <option value="">Fatura Türü Seçin</option>
          {billTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Fatura Tutarı"
          aria-label="Fatura Tutarı"
          onChange={(e) => handleInputChange(e, "amount")}
          value={formData.amount}
        />
      </div>
      <div className="input-group mb-3">
        <select
          className="form-control"
          aria-label="Dönem"
          onChange={(e) => handleInputChange(e, "period")}
          value={formData.period}
        >
          <option value="">Dönem Seçin</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BillForm;
