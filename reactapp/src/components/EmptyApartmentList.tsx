import React, { useState, useEffect } from "react";
import { get } from "./ApiHelper";

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
  const [er, setEr] = useState<string | null>(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await get(
          "https://localhost:7082/api/Admin/GetEmptyApartments"
        );
        setApartments(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setEr(error.message);
        } else {
          setEr("An unknown error occurred");
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
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (er) {
    return (
      <div className="alert alert-danger" role="alert">
        {er}
      </div>
    );
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
