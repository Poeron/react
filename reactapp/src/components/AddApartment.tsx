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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <h1>Daire Ekle</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Blok"
            aria-label="Blok"
            onChange={(e) => handleInputChange(e, "block")}
            value={formData.block}
          />
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
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddApartment;
