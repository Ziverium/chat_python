import { useState } from "react";
import axios from "axios";

export default function Chat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL; // For Next.js
      const response = await axios.post(`${API_URL}/chad_gpt`, {
        message: input,
      });

      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: "bot",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1998/1998614.png"
            alt="Chat Bot"
          />
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f9;
        }
        .chat-window {
          width: 400px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        .image-container {
          width: 100%;
          height: 200px; /* Adjust the image container height */
          background-color: #007bff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-container img {
          max-height: 100%;
          object-fit: contain;
        }
        .messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          width: 100%;
          margin: auto;
        }
        .message {
          margin: 5px 0;
          padding: 10px;
          border-radius: 5px;
          max-width: 80%;
        }
        .message.user {
          background: #007bff;
          color: white;
          align-self: flex-end;
        }
        .message.bot {
          background: #f1f1f1;
          color: #333;
          align-self: flex-start;
        }
        .input-area {
          display: flex;
          padding: 10px;
          background: #f9f9f9;
          width: 100%;
        }
        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-right: 10px;
        }
        button {
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch initial messages (if any) from the server
  const initialMessages = [];
  return { props: { initialMessages } };
}
