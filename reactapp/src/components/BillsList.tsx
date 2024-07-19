interface Bills {
  full_name: string;
  bill_type: string;
  amount: string;
  period: string;
}
interface Props {
  title: string;
  bills: Bills[];
}

const BillsList = ({ title, bills }: Props) => {
  const billTypesConverted: Record<string, string> = {
    Gas: "Doğalgaz",
    Water: "Su",
    Electricity: "Elektrik",
    Dues: "Aidat",
  };

  return (
    <>
      <h2>{title}</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Fatura Türü</th>
            <th>Ücret</th>
            <th>Dönem</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.full_name}</td>
              <td>{billTypesConverted[bill.bill_type]}</td>
              <td>{bill.amount}</td>
              <td>{bill.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BillsList;
