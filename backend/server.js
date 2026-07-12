const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initSocket } = require("./socket/socket");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Chat API is running 🚀");
});

const PORT = process.env.PORT || 5000;

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

initSocket(io);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});