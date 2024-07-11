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
  const [errors, setErrors] = useState<FormData>({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors: FormData = {
      full_name: "",
      national_id: "",
      email: "",
      phone: "",
    };

    if (formData.full_name.trim() === "") {
      newErrors.full_name = "Full name is required";
      valid = false;
    }

    if (!/^\d{11}$/.test(formData.national_id)) {
      newErrors.national_id = "National ID must be 11 digits";
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const url = `https://localhost:7082/api/Admin/AddUser?id=${selectedApartmentId}`;
      const response = await post(url, { ...formData });
      alert(
        `Form submitted successfully!\nUser Password: ${response.password}`
      );
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
          {errors.full_name && (
            <div className="text-danger">{errors.full_name}</div>
          )}
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
          {errors.national_id && (
            <div className="text-danger">{errors.national_id}</div>
          )}
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
          {errors.email && <div className="text-danger">{errors.email}</div>}
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
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddUser;
