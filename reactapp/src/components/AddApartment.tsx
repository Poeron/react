import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  block: string;
  type: string;
  floor: number | string;
  apartment_number: number | string;
}

const AddApartment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    block: "",
    type: "",
    floor: "",
    apartment_number: "",
  });

  const [errors, setErrors] = useState<FormData>({
    block: "",
    type: "",
    floor: "",
    apartment_number: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors: FormData = {
      block: "",
      type: "",
      floor: "",
      apartment_number: "",
    };

    if (formData.block.trim() === "") {
      newErrors.block = "Block is required";
      valid = false;
    }

    if (!/^\d+\+\d+$/.test(formData.type)) {
      newErrors.type = 'Type must be in the format "2+1", "3+1", etc.';
      valid = false;
    }

    if (formData.floor === "" || isNaN(Number(formData.floor))) {
      newErrors.floor = "Floor must be a number";
      valid = false;
    }

    if (
      formData.apartment_number === "" ||
      isNaN(Number(formData.apartment_number))
    ) {
      newErrors.apartment_number = "Apartment number must be a number";
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
      const response = await fetch(
        "https://localhost:7082/api/Admin/AddApartment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
    let value: string | number = e.target.value;

    // Convert to integer if the field represents an integer value
    if (fieldName === "floor" || fieldName === "apartment_number") {
      value = parseInt(value, 10); // Parse input as integer
      if (isNaN(value)) {
        // Check if parsing failed
        value = ""; // Reset to empty string if not a valid integer
      }
    }

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <h1>Daire Ekle</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Blok"
            aria-label="Blok"
            onChange={(e) => handleInputChange(e, "block")}
            value={formData.block}
          />
          {errors.block && <div className="text-danger">{errors.block}</div>}
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tipi (örneğin 2+1)"
            aria-label="Tipi (örneğin 2+1)"
            onChange={(e) => handleInputChange(e, "type")}
            value={formData.type}
          />
          {errors.type && <div className="text-danger">{errors.type}</div>}
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Bulunduğu Kat"
            aria-label="Bulunduğu Kat"
            onChange={(e) => handleInputChange(e, "floor")}
            value={formData.floor}
          />
          {errors.floor && <div className="text-danger">{errors.floor}</div>}
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Daire Numarası"
            aria-label="Daire Numarası"
            onChange={(e) => handleInputChange(e, "apartment_number")}
            value={formData.apartment_number}
          />
          {errors.apartment_number && (
            <div className="text-danger">{errors.apartment_number}</div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddApartment;
