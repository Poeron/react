import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface User {
  id: number;
  full_name: string;
  national_id: string;
  email: string;
  phone: string;
  block: string;
  apartment_number: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const update_user = () => {
    const full_name = document.getElementById("full_name") as HTMLInputElement;
    const national_id = document.getElementById(
      "national_id"
    ) as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;

    fetch("https://localhost:7082/api/Admin/UpdateUser", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: full_name.value,
        national_id: national_id.value,
        email: email.value,
        phone: phone.value,
        id: selectedUser?.id,
      }),
    }).then(() => {
      console.log("Updated");
      handleClose();
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetUsers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        setUsers(data);
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

    fetchUsers();
  }, [update_user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <br />
      <br />
      <h2>Kiracılar</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>TCKN</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Blok</th>
            <th>Daire Numarası</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.national_id}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.block}</td>
              <td>{user.apartment_number}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedUser(user);
                    handleShow();
                  }}
                >
                  Düzenle
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    fetch(
                      `https://localhost:7082/api/Admin/DeleteUser/?id=${user.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                        method: "DELETE",
                      }
                    ).then(() => {
                      setUsers((prevUsers) =>
                        prevUsers.filter((u) => u.id !== user.id)
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
            {selectedUser
              ? "Kullanıcı ID: " + selectedUser.id
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
                  id="full_name"
                  autoComplete="full_name"
                  placeholder="John Doe"
                  defaultValue={selectedUser?.full_name}
                />
                <Form.Label htmlFor="full_name">Ad Soyad</Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="text"
                  className=""
                  id="national_id"
                  autoComplete="national_id"
                  placeholder="TCKN"
                  defaultValue={selectedUser?.national_id}
                />
                <Form.Label htmlFor="national_id">TCKN</Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="email"
                  className=""
                  id="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  defaultValue={selectedUser?.email}
                />
                <Form.Label htmlFor="email">E-Mail</Form.Label>
              </Form.Floating>
              <Form.Floating className=" mb-3">
                <Form.Control
                  type="tel"
                  className=""
                  id="phone"
                  autoComplete="phone"
                  placeholder="5554442211"
                  defaultValue={selectedUser?.phone}
                />
                <Form.Label htmlFor="phone">Telefon Numarası</Form.Label>
              </Form.Floating>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={update_user}>
            Düzenle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
