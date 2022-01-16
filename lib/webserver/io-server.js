const TicTacToeGame = require("../modules/TicTacToeGame");
const Player = require("../modules/Player");
const Server = require("socket.io");

const players = {};

/**
 * initializing the socket.io server
 * @param {Server} io
 */
var initIo = (io) => {
  io.on("connection", (socket) => {
    console.log(`socket connect ${socket.id}`);

    var newPlayer = new Player(socket);
    players[socket.id] = newPlayer;

    // removing the player from the list on disconnect
    socket.on("disconnect", () => {
      console.log(`socket disconnect ${socket.id}`);
      delete players[socket.id];
    });

    const playersIds = Object.keys(players);

    // if there are less then 2 players then notifies the players to wait
    if (playersIds.length < 2) {
      newPlayer.emitWaitForPlayer();
    }

    // setting up the game when 2 player is connected
    if (playersIds.length === 2) {
      const game = new TicTacToeGame(playersIds[0], playersIds[1]);

      const player1 = players[playersIds[0]];
      const player2 = players[playersIds[1]];

      player1.setUpPlayer(player2, game);
      player2.setUpPlayer(player1, game);
    }

    // disconnecting if there are more then 2 players connected
    if (playersIds.length > 2) {
      socket.disconnect();
    }
  });
};

module.exports = { initIo };
