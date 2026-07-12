# Realtime Group Chat

A real-time group chat application built using React, Node.js, Express, Socket.io, and MongoDB.

## Features

- 🚀 Real-time messaging with Socket.io
- 💾 Persistent chat history using MongoDB
- 👤 Dummy username login
- 🕒 Message timestamps
- 🔄 Automatic chat scrolling
- ⌨️ Send messages using Enter key
- 📱 Responsive interface

---

## Tech Stack

### Frontend

- React (Vite)
- Axios
- Socket.io Client

### Backend

- Node.js
- Express
- Socket.io
- MongoDB
- Mongoose

---

## Folder Structure

```
ChatApp
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── socket
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone

```bash
git clone <repository-url>
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create `backend/.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## API Endpoints

### Fetch Messages

```
GET /messages
```

### Send Message

```
POST /messages
```

Body

```json
{
  "username": "Shubham",
  "text": "Hello!"
}
```

---

## Assumptions

- Single global chat room
- Dummy username authentication
- Messages are visible to all connected users

---

## Future Improvements

- Private messaging
- Online users
- Typing indicator
- Read receipts
- File sharing
