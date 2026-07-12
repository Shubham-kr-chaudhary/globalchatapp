import { useEffect, useRef, useState } from "react";
import api from "./services/api";
import socket from "./services/socket";
import "./App.css";

function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [tempUsername, setTempUsername] = useState("");

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  // Load previous messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await api.get("/messages");
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();
  }, []);

  // Listen for socket messages
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const login = () => {
    if (!tempUsername.trim()) return;

    localStorage.setItem("username", tempUsername);
    setUsername(tempUsername);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setTempUsername("");
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/messages", {
        username,
        text,
      });

      setText("");

      messageInputRef.current?.focus();
    } catch (err) {
      console.error(err);
    }
  };

  if (!username) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Realtime Chat</h1>

          <p>Enter your username to continue</p>

          <input
            value={tempUsername}
            placeholder="Username"
            onChange={(e) => setTempUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />

          <button onClick={login}>Continue</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Realtime Group Chat</h2>

        <div className="user-info">
          Welcome,&nbsp;
          <strong>{username}</strong>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="chat-box">
        {messages.length === 0 && (
          <div className="empty-chat">
            No messages yet. Start the conversation 👋
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.username === username
                ? "message own-message"
                : "message"
            }
          >
            <strong>
              {msg.username === username
                ? "You"
                : msg.username}
            </strong>

            <p>{msg.text}</p>

            <small>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-row">
        <input
          ref={messageInputRef}
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;