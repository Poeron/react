import React, { useState, ChangeEvent, FormEvent } from "react";
import { post } from "./ApiHelper";

interface FormData {
  full_name: string;
  national_id: string;
  email: string;
  phone: string;
}

interface AddUserProps {
  selectedApartmentId: string;
}

const AddUser: React.FC<AddUserProps> = ({ selectedApartmentId }) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `https://localhost:7082/api/Admin/AddUser?id=${selectedApartmentId}`;
      const response = await post(url, { ...formData });
      alert(`Form submitted successfully!
User Password: ${response.password}`);
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
      <h1>Kiracı Ekle</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ad Soyad"
            aria-label="Ad Soyad"
            onChange={(e) => handleInputChange(e, "full_name")}
            value={formData.full_name}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="TCKN"
            aria-label="TCKN"
            onChange={(e) => handleInputChange(e, "national_id")}
            value={formData.national_id}
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
            onChange={(e) => handleInputChange(e, "phone")}
            value={formData.phone}
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
