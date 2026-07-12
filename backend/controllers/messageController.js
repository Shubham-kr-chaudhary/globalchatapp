const Message = require("../models/Message");
const { getIO } = require("../socket/socket");


const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({
        message: "Username and text are required",
      });
    }

const message = await Message.create({
    username,
    text,
});

getIO().emit("receiveMessage", message);

res.status(201).json(message);


  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};