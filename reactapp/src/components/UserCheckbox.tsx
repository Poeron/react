import React, { useState, useEffect } from "react";

interface User {
  id: number;
  ad_soyad: string;
  blok: string;
  daire_numarasi: number;
}

interface UserListProps {
  onUserSelect: (userIds: number[]) => void;
}

const UserCheckbox: React.FC<UserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetUsersForBills"
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              <strong>Ad Soyad:</strong> {user.ad_soyad}
            </div>
            <div>
              <strong>Blok:</strong> {user.blok}
            </div>
            <div>
              <strong>Daire Numarası:</strong> {user.daire_numarasi}
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default UserCheckbox;
