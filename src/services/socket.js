import { io } from "socket.io-client";

const socket = io("https://napi.aquicob.com.br:3006/");

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;
