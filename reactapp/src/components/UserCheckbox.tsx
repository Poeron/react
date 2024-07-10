import React, { useState, useEffect } from "react";
import { get } from "./ApiHelper";

interface User {
  id: number;
  full_name: string;
  block: string;
  apartment_number: number;
}

interface UserListProps {
  onUserSelect: (userIds: number[]) => void;
}

const UserCheckbox: React.FC<UserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

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

  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      // Tüm seçimleri kaldır
      setSelectedUserIds([]);
      onUserSelect([]);
    } else {
      // Tüm kullanıcıları seç
      const allUserIds = users.map((user) => user.id);
      setSelectedUserIds(allUserIds);
      onUserSelect(allUserIds);
    }
  };

  const handleCheckboxChange = (userId: number) => {
    setSelectedUserIds((prevSelected) => {
      const newSelected = prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId];
      onUserSelect(newSelected);
      return newSelected;
    });
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
      <button className="btn btn-primary mb-3" onClick={handleSelectAll}>
        {selectedUserIds.length === users.length
          ? "Tüm Seçimleri Kaldır"
          : "Tümünü Seç"}
      </button>
      <br />
      <div className="list-group">
        {users.map((user) => (
          <label key={user.id} className="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              value={user.id.toString()}
              checked={selectedUserIds.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
            <div>
              <strong>Ad Soyad:</strong> {user.full_name}
            </div>
            <div>
              <strong>Blok:</strong> {user.block}
            </div>
            <div>
              <strong>Daire Numarası:</strong> {user.apartment_number}
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default UserCheckbox;
