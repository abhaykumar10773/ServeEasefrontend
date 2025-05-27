import { io } from "socket.io-client";

// Replace with your backend URL
export const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket"]
});


socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });
  
  socket.on("sendBooking", (data) => {
    console.log("Received booking data:", data);
  });


