import React, { useState, useEffect } from "react";

interface Apartment {
  id: number;
  block: string;
  type: string;
  floor: string;
  apartment_number: string;
}

interface ApartmentListProps {
  onSelectApartment: (apartmentId: string) => void;
}

const EmptyApartmentList: React.FC<ApartmentListProps> = ({
  onSelectApartment,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetEmptyApartments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Apartment[] = await response.json();
        setApartments(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  const handleApartmentSelect = (apartmentId: string) => {
    setSelectedApartmentId(apartmentId);
    onSelectApartment(apartmentId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <br />
      <div className="apartment-grid">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="apartment-card">
            <label className="apartment-card-content">
              <input
                className="form-check-input"
                type="radio"
                value={apartment.id.toString()}
                checked={selectedApartmentId === apartment.id.toString()}
                onChange={() => handleApartmentSelect(apartment.id.toString())}
              />
              <div>
                <strong>Blok:</strong> {apartment.block}
              </div>
              <div>
                <strong>Tipi:</strong> {apartment.type}
              </div>
              <div>
                <strong>Bulunduğu Kat:</strong> {apartment.floor}
              </div>
              <div>
                <strong>Daire Numarası:</strong> {apartment.apartment_number}
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmptyApartmentList;
