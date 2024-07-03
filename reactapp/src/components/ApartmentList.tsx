import React, { useState, useEffect } from "react";

interface Apartment {
  id: number;
  blok: string;
  tipi: string;
  bulundugu_kat: string;
  daire_numarasi: string;
}

interface ApartmentListProps {
  onSelectApartment: (apartmentId: string) => void;
}

const ApartmentList: React.FC<ApartmentListProps> = ({ onSelectApartment }) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetEmptyApartments"
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
      <div className="list-group">
        {apartments.map((apartment) => (
          <label key={apartment.id} className="list-group-item">
            <input
              className="form-check-input me-1"
              type="radio"
              value={apartment.id.toString()}
              checked={selectedApartmentId === apartment.id.toString()}
              onChange={() => handleApartmentSelect(apartment.id.toString())}
            />
            <div>
              <strong>Blok:</strong> {apartment.blok}
            </div>
            <div>
              <strong>Tipi:</strong> {apartment.tipi}
            </div>
            <div>
              <strong>Bulunduğu Kat:</strong> {apartment.bulundugu_kat}
            </div>
            <div>
              <strong>Daire Numarası:</strong> {apartment.daire_numarasi}
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default ApartmentList;
