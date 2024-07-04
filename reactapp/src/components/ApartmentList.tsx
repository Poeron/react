import React, { useEffect, useState } from "react";

interface Apartment {
  id: number;
  blok: string;
  durumu: string;
  tipi: string;
  bulundugu_kat: string;
  daire_numarasi: string;
}

const ApartmentList = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetApartments"
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (apartments.length === 0) {
    return <div>No apartments found</div>;
  }
  return (
    <>
      <h2>Daireler</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Durumu</th>
            <th>Tipi</th>
            <th>Blok</th>
            <th>Daire Numarası</th>
            <th>Bulunduğu Kat</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment) => (
            <tr key={apartment.id}>
              <td>{apartment.durumu}</td>
              <td>{apartment.tipi}</td>
              <td>{apartment.blok}</td>
              <td>{apartment.daire_numarasi}</td>
              <td>{apartment.bulundugu_kat}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setSelectedApartmentId(apartment.id.toString())
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    fetch(
                      `https://localhost:7082/api/Admin/DeleteApartment/?id=${apartment.id}`,
                      {
                        method: "DELETE",
                      }
                    ).then(() => {
                      setApartments((prevApartments) =>
                        prevApartments.filter((a) => a.id !== apartment.id)
                      );
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ApartmentList;
