const Player = require("../modules/Player");
const Server = require("socket.io");
const Room = require("../modules/Room");

waitingPlayers = [];

/**
 * initializing the socket.io server
 * @param {Server} io
 */
var initIo = (io) => {
  io.on("connection", (socket) => {
    console.log(`socket connect ${socket.id}`);

    // removing the player from the list on disconnect
    socket.on("disconnect", () => {
      console.log(`socket disconnect ${socket.id}`);

      if (socket.room) {
        socket.room.closeRoom();
        delete socket.room;
      }
    });

    var newPlayer = new Player(socket);
    waitingPlayers[waitingPlayers.length] = newPlayer;

    newPlayer.emitWaitForPlayer();

    // setting up the game when 2 player is connected
    if (waitingPlayers.length === 2) {
      const player1 = waitingPlayers[0];
      const player2 = waitingPlayers[1];
      const room = new Room(player1, player2);

      player1.socket.room = room;
      player2.socket.room = room;

      waitingPlayers = [];
    }
  });
};

module.exports = { initIo };
