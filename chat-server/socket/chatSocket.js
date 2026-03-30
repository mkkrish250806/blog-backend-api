module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ================= JOIN ROOM =================
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined ${room}`);

      socket.to(room).emit("receiveMessage", {
        message: "A new user joined the room"
      });
    });

    // ================= SEND MESSAGE =================
    socket.on("sendMessage", (data) => {
      const { room, message } = data;

      console.log(`Message in ${room}: ${message}`);

      // send message to everyone in room
      io.to(room).emit("receiveMessage", {
        user: socket.id,
        message: message
      });
    });

    // ================= DISCONNECT =================
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

  });

};