import { io } from "socket.io-client";

const socket = io("https://globalchatapp-api.onrender.com");

export default socket;