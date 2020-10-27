import io from 'socket.io-client';
import { baseURL } from "./variables";

const socket = io.connect(baseURL);
export default socket;
