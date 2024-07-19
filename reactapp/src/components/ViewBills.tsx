interface Bills {
  id: number;
  is_paid: boolean;
  full_name: string;
  bill_type: string;
  amount: number;
  period: string;
}

interface Props {
  bills: Bills[];
  handleSelectedBillID: (id: number) => void;
  handleShow: (show: boolean) => void;
}

const ViewBills = ({ bills, handleSelectedBillID, handleShow }: Props) => {
  const billTypesConverted: Record<string, string> = {
    Gas: "Doğalgaz",
    Water: "Su",
    Electricity: "Elektrik",
    Dues: "Aidat",
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tüm Faturalar</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Fatura Tipi</th>
            <th scope="col">Dönem</th>
            <th scope="col">Tutar</th>
            <th scope="col">Durum</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{billTypesConverted[bill.bill_type]}</td>
              <td>{bill.period}</td>
              <td>{bill.amount}</td>
              <td>
                {bill.is_paid ? (
                  <span className="badge bg-success">
                    <i className="bi bi-check-circle-fill"></i> Ödendi
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    <i className="bi bi-x-circle-fill"></i> Ödenmedi
                  </span>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className={
                    bill.is_paid
                      ? "btn btn-primary disabled"
                      : "btn btn-primary"
                  }
                  onClick={() => {
                    handleSelectedBillID(bill.id);
                    handleShow(true);
                  }}
                >
                  Öde
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBills;
