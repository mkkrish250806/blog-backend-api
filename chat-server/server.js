const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// socket server
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// import socket logic
require("./socket/chatSocket")(io);

// ✅ Only ONE route
app.get("/", (req, res) => {
  res.send(`
    <h2>Chat Server Running ✅</h2>

    <script src="/socket.io/socket.io.js"></script>

    <script>
      const socket = io("http://localhost:5000");

      console.log("Connecting...");

      socket.emit("joinRoom", "room1");

      socket.emit("sendMessage", {
        room: "room1",
        message: "Hello from browser!"
      });

      socket.on("receiveMessage", data => {
        console.log("Message received:", data);
      });
    </script>
  `);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});