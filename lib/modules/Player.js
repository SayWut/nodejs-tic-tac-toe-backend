const { events } = require("../constants/constants");

class Player {
  constructor(socket) {
    this.socket = socket;
    this.playerId = socket.id;
  }

  setUpPlayer(secondPlayer, game) {
    this.#onSelectSquare((data) => {
      const row = data[0];
      const col = data[1];

      const isSelected = game.selectSquare(row, col, this.playerId);
      if (isSelected) {
        this.emitUpdateGameData(game.gameData);
        secondPlayer.emitUpdateGameData(game.gameData);

        game.checkIsGameover().then((isGameover) => {
          if (isGameover) {
            this.emitGameover(game.gameoverMap);
            secondPlayer.emitGameover(game.gameoverMap);
          }
        });
      }
    });

    this.emitStartGame(game.gameData);
  }

  #onSelectSquare = (handler) => {
    this.socket.on(events.client.select_square, handler);
  };

  emitWaitForPlayer = () => {
    this.socket.emit(events.server.wait_for_player);
  };

  emitStartGame = (gameData) => {
    this.socket.emit(events.server.start_game, gameData);
  };

  emitUpdateGameData = (gameData) => {
    this.socket.emit(events.server.update_board, gameData);
  };

  emitGameover = (data) => {
    this.socket.emit(events.server.gameover, data);
    this.socket.disconnect();
  };
}

module.exports = Player;
