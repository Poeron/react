import React, { useState, ChangeEvent, FormEvent } from "react";
import UserList from "../components/UserList"; // UserList bileşenini import et

interface BillData {
  fatura_turu: string;
  fatura_tutari: string;
  donem: string;
}

const AddBill: React.FC = () => {
  const [formData, setFormData] = useState<BillData>({
    fatura_turu: "",
    fatura_tutari: "",
    donem: "",
  });
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const handleUserSelect = (userIds: number[]) => {
    setSelectedUserIds(userIds);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert fatura_tutari to ücret and send to API
      const payload = {
        bill: {
          fatura_turu: formData.fatura_turu,
          ucret: parseInt(formData.fatura_tutari, 10),
          donem: formData.donem,
        },
        kullaniciIdler: selectedUserIds,
      };

      if (isNaN(payload.bill.ucret)) {
        throw new Error("Invalid value for 'Fatura Tutarı'");
      }

      const response = await fetch("https://localhost:7082/api/Admin/AddBill", {
        method: "POST",
        headers: {
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

  const billTypes = ["Aidat", "Su", "Elektrik", "Doğalgaz"];
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
    <>
      <h1>Add Bill</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <select
            className="form-control"
            aria-label="Fatura Türü"
            onChange={(e) => handleInputChange(e, "fatura_turu")}
            value={formData.fatura_turu}
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
            onChange={(e) => handleInputChange(e, "fatura_tutari")}
            value={formData.fatura_tutari}
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-control"
            aria-label="Dönem"
            onChange={(e) => handleInputChange(e, "donem")}
            value={formData.donem}
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
      <UserList onUserSelect={handleUserSelect} />
    </>
  );
};

export default AddBill;
