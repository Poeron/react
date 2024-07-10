// UserList.tsx
import React, { useState, useEffect } from "react";
import { get, put, remove } from "./ApiHelper";
import UserModal from "./UserModal";
import ConfirmationModal from "./ConfirmationModal";

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
  const [er, setEr] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);

  const updateUser = () => {
    const full_name = document.getElementById("full_name") as HTMLInputElement;
    const national_id = document.getElementById(
      "national_id"
    ) as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;

    put(`https://localhost:7082/api/Admin/UpdateUser`, {
      full_name: full_name.value,
      national_id: national_id.value,
      email: email.value,
      phone: phone.value,
      id: selectedUser?.id,
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === selectedUser?.id
              ? {
                  ...u,
                  full_name: full_name.value,
                  national_id: national_id.value,
                  email: email.value,
                  phone: phone.value,
                }
              : u
          )
        );
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const deleteUser = () => {
    if (userToDelete) {
      remove(
        `https://localhost:7082/api/Admin/DeleteUser/?id=${userToDelete.id}`
      )
        .then(() => {
          setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
          handleCloseConfirmation();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("https://localhost:7082/api/Admin/GetUsers");
        setUsers(response);
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

    fetchUsers();
  }, []);

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
                    setUserToDelete(user);
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
      <UserModal
        show={show}
        handleClose={handleClose}
        selectedUser={selectedUser}
        updateUser={updateUser}
      />
      <ConfirmationModal
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={deleteUser}
        title="Emin misiniz?"
        body="Bu işlemi geri alamazsınız. Silmek istediğinizden emin misiniz?"
      />
    </>
  );
};

export default UserList;
