import React, { useState, useEffect } from "react";

interface Message {
  full_name: string;
  content: string;
  formattedDate: string;
}
const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [er, setEr] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://localhost:7082/api/Admin/GetMessages",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Message[] = await response.json();
        setMessages(data);
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
    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (messages.length === 0) {
    return <div>No messages found</div>;
  }
  if (er) return <div>An error occurred: {er}</div>;

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
