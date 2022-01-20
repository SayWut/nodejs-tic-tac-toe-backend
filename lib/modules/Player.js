const { events } = require("../constants/constants");

class Player {
  constructor(socket) {
    this.socket = socket;
    this.playerId = socket.id;
  }

  onSelectSquare = (handler) => {
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
  };
}

module.exports = Player;
