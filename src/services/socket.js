import { io } from "socket.io-client";
import { GCurl } from "../config/url";

const socket = io(GCurl);

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;
