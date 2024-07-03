import React, { useState } from "react";

interface FormComponentProps {
  title: string;
  placeholders: string[];
  apiData: string[];
}

const FormComponent: React.FC<FormComponentProps> = ({
  title,
  placeholders,
  apiData,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    placeholder: string
  ) => {
    for (let i = 0; i < placeholders.length; i++) {
      if (placeholder === placeholders[i]) {
        setFormData({
          ...formData,
          [apiData[i]]: e.target.value,
        });
        break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      // Burada başka bir işlem yapabilirsiniz, örneğin formu sıfırlayabilirsiniz.
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <form className="container" onSubmit={handleSubmit}>
        {placeholders.map((placeholder, index) => (
          <div key={index} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              aria-label={placeholder}
              onChange={(e) => handleInputChange(e, placeholder)}
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormComponent;
