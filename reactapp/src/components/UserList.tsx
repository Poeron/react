import React, { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetUsers"
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
  }, []);

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
    </>
  );
};

export default UserList;
