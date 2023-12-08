import socketIOClient  from 'socket.io-client';

const SOCKET_SERVER_URL:string = "http://103.122.163.148:8000";
export const socket = socketIOClient(SOCKET_SERVER_URL);