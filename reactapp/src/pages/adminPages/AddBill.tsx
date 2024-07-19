import React, { useState, ChangeEvent, FormEvent } from "react";
import UserCheckbox from "../../components/UserCheckbox"; // UserList bileşenini import et
import BillForm from "../../components/BillForm";

const AddBill: React.FC = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const handleUserSelect = (userIds: number[]) => {
    setSelectedUserIds(userIds);
  };

  return (
    <>
      <br />
      <BillForm selectedUserIds={selectedUserIds} />
      <UserCheckbox onUserSelect={handleUserSelect} />
    </>
  );
};

export default AddBill;
