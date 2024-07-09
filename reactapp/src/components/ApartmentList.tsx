import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Apartment {
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
  const [error, setError] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const update_apartment = () => {
    const type = document.getElementById("type") as HTMLInputElement;
    const block = document.getElementById("block") as HTMLInputElement;
    const apartment_number = document.getElementById(
      "apartment_number"
    ) as HTMLInputElement;
    const floor = document.getElementById("floor") as HTMLInputElement;

    fetch("https://localhost:7082/api/Admin/UpdateApartment", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type.value,
        block: block.value,
        apartment_number: parseInt(apartment_number.value),
        floor: parseInt(floor.value),
        id: selectedApartment?.id,
      }),
    }).then(() => {
      console.log("Updated");
      handleClose();
    });
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetApartments",
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
  }, [update_apartment]);

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
                    fetch(
                      `https://localhost:7082/api/Admin/DeleteApartment/?id=${apartment.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                        method: "DELETE",
                      }
                    ).then(() => {
                      setApartments((prevApartments) =>
                        prevApartments.filter((a) => a.id !== apartment.id)
                      );
                    });
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedApartment
              ? "Daire ID: " + selectedApartment.id
              : "ID alınamadı."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bd-example">
            <Form>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="text"
                  className=""
                  id="type"
                  autoComplete="type"
                  placeholder="2+1"
                  defaultValue={selectedApartment?.type}
                />
                <Form.Label htmlFor="type">Tipi</Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="text"
                  className=""
                  id="block"
                  autoComplete="block"
                  placeholder="A"
                  defaultValue={selectedApartment?.block}
                />
                <Form.Label htmlFor="block">Blok</Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="number"
                  className=""
                  id="apartment_number"
                  autoComplete="apartment_number"
                  placeholder="12"
                  defaultValue={selectedApartment?.apartment_number}
                />
                <Form.Label htmlFor="apartment_number">
                  Daire Numarası
                </Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="number"
                  className=""
                  id="floor"
                  autoComplete="floor"
                  placeholder="2"
                  defaultValue={selectedApartment?.floor}
                />
                <Form.Label htmlFor="floor">Bulunduğu Kat</Form.Label>
              </Form.Floating>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={update_apartment}>
            Düzenle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApartmentList;
