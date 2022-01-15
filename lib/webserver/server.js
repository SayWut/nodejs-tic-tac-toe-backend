require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ioServer = require("./io-server");
const io = require("socket.io")(server);

ioServer.initIo(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
