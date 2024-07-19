interface Message {
  full_name: string;
  content: string;
  formattedDate: string;
}
interface Props {
  messages: Message[];
}
const MessageList = ({ messages }: Props) => {
  if (messages.length === 0) {
    return <div>No messages found</div>;
  }
  return (
    <>
      <div className="container">
        <br />
        <h2>Mesajlar</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Mesaj</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{message.full_name}</td>
                <td>{message.content}</td>
                <td>{message.formattedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MessageList;
