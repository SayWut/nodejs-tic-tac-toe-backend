const TicTacToeGame = require("../modules/TicTacToeGame");
const Player = require("../modules/Player");

const players = {};

var initIo = (io) => {
  io.on("connection", (socket) => {
    console.log(`socket connect ${socket.id}`);

    var newPlayer = new Player(socket);
    players[socket.id] = newPlayer;

    socket.on("disconnect", () => {
      console.log(`socket disconnect ${socket.id}`);
      delete players[socket.id];
    });

    const playersIds = Object.keys(players);

    if (playersIds.length < 2) {
      newPlayer.emitWaitForPlayer();
    }

    if (playersIds.length === 2) {
      const game = new TicTacToeGame(playersIds[0], playersIds[1]);

      const player1 = players[playersIds[0]];
      const player2 = players[playersIds[1]];

      player1.setUpPlayer(player2, game);
      player2.setUpPlayer(player1, game);
    }

    if (playersIds.length > 2) {
      socket.disconnect();
    }
  });
};

module.exports = { initIo };
