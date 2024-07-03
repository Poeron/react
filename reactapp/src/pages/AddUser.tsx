import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  ad_soyad: string;
  tckn: string;
  email: string;
  telefon: string;
}

interface AddUserProps {
  selectedApartmentId: string;
}

const AddUser: React.FC<AddUserProps> = ({ selectedApartmentId }) => {
  const [formData, setFormData] = useState<FormData>({
    ad_soyad: "",
    tckn: "",
    email: "",
    telefon: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `https://localhost:7082/api/Admin/AddUser?id=${selectedApartmentId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
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
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <>
      <h1>Add User</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ad Soyad"
            aria-label="Ad Soyad"
            onChange={(e) => handleInputChange(e, "ad_soyad")}
            value={formData.ad_soyad}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="TCKN"
            aria-label="TCKN"
            onChange={(e) => handleInputChange(e, "tckn")}
            value={formData.tckn}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="E-posta"
            aria-label="E-posta"
            onChange={(e) => handleInputChange(e, "email")}
            value={formData.email}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Telefon Numarası"
            aria-label="Telefon Numarası"
            onChange={(e) => handleInputChange(e, "telefon")}
            value={formData.telefon}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddUser;
