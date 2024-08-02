// ApartmentList.tsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { get, put, remove } from "./ApiHelper";
import ApartmentModal from "./ApartmentModal";
import ConfirmationModal from "./ConfirmationModal";

export interface Apartment {
  id: number;
  block: string;
  is_full: boolean;
  type: string;
  floor: number;
  apartment_number: number;
}

const ApartmentList = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState<Apartment | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);

  const updateApartment = () => {
    const type = document.getElementById("type") as HTMLInputElement;
    const block = document.getElementById("block") as HTMLInputElement;
    const apartment_number = document.getElementById(
      "apartment_number"
    ) as HTMLInputElement;
    const floor = document.getElementById("floor") as HTMLInputElement;

    put("https://localhost:7082/api/Admin/UpdateApartment", {
      type: type.value,
      block: block.value,
      apartment_number: parseInt(apartment_number.value),
      floor: parseInt(floor.value),
      id: selectedApartment?.id,
    }).then(() => {
      setApartments((prevApartments) =>
        prevApartments.map((a) =>
          a.id === selectedApartment?.id
            ? {
                ...a,
                type: type.value,
                block: block.value,
                apartment_number: parseInt(apartment_number.value),
                floor: parseInt(floor.value),
              }
            : a
        )
      );
      handleClose();
    });
  };

  const deleteApartment = () => {
    if (apartmentToDelete) {
      remove(
        `https://localhost:7082/api/Admin/DeleteApartment/?id=${apartmentToDelete.id}`
      ).then(() => {
        setApartments((prevApartments) =>
          prevApartments.filter((a) => a.id !== apartmentToDelete.id)
        );
        handleCloseConfirmation();
      });
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await get(
          `https://localhost:7082/api/Admin/GetApartments?pageNumber=${currentPage}&pageSize=${pageSize}`
        );
        console.log(response);
        setApartments(response.apartments);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
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
  }, [currentPage, pageSize]);

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
  if (apartments.length === 0) {
    return <div>No apartments found</div>;
  }
  return (
    <div className="container">
      <h2>Daireler</h2>
      <div>
        <label htmlFor="pageSize">Page Size: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
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
              <td>{apartment.is_full ? "Dolu" : "Boş"}</td>
              <td>{apartment.type}</td>
              <td>{apartment.block}</td>
              <td>{apartment.apartment_number}</td>
              <td>{apartment.floor}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedApartment(apartment);
                    handleShow();
                  }}
                >
                  Düzenle
                </button>
              </td>
              <td>
                <button
                  className={
                    apartment.is_full === true
                      ? "btn btn-danger disabled"
                      : "btn btn-danger"
                  }
                  onClick={() => {
                    setApartmentToDelete(apartment);
                    handleShowConfirmation();
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span
          style={{
            margin: "0 10px",
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <ApartmentModal
        show={show}
        handleClose={handleClose}
        selectedApartment={selectedApartment}
        updateApartment={updateApartment}
      />
      <ConfirmationModal
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={deleteApartment}
        title="Emin misiniz?"
        body="Bu işlemi geri alamazsınız. Silmek istediğinizden emin misiniz?"
      />
    </div>
  );
};

export default ApartmentList;
