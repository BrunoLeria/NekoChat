import { io } from "socket.io-client";

const socket = io("http://34.133.111.12:3005/");

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;
