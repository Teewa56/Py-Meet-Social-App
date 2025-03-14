import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { withCredentials: true });

socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
  
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id) {
    socket.emit("userOnline", user._id);
  }
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

export { socket };
