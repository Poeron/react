import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  blok: string;
  tipi: string;
  bulundugu_kat: number | string;
  daire_numarasi: number | string;
}

const AddApartment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    blok: "",
    tipi: "",
    bulundugu_kat: "",
    daire_numarasi: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7082/api/Admin/AddApartment",
        {
          method: "POST",
          headers: {
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
    if (fieldName === "bulundugu_kat" || fieldName === "daire_numarasi") {
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
      <h1>Add Apartment</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Blok"
            aria-label="Blok"
            onChange={(e) => handleInputChange(e, "blok")}
            value={formData.blok}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tipi (örneğin 2+1)"
            aria-label="Tipi (örneğin 2+1)"
            onChange={(e) => handleInputChange(e, "tipi")}
            value={formData.tipi}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Bulunduğu Kat"
            aria-label="Bulunduğu Kat"
            onChange={(e) => handleInputChange(e, "bulundugu_kat")}
            value={formData.bulundugu_kat}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Daire Numarası"
            aria-label="Daire Numarası"
            onChange={(e) => handleInputChange(e, "daire_numarasi")}
            value={formData.daire_numarasi}
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
