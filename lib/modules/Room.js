const TicTacToeGame = require("./TicTacToeGame");

class Room {
  #game;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;

    this.#game = new TicTacToeGame(player1.playerId, player2.playerId);

    this.#initPlayer(player1);
    this.#initPlayer(player2);

    this.#startGame();
  }

  // initialize player
  #initPlayer = (player) => {
    player.onSelectSquare((data) => {
      this.#selecetSquare(data[0], data[1], player.playerId);
    });
  };

  // notifies the players the game started
  #startGame = () => {
    this.player1.emitStartGame(this.#game.gameData);
    this.player2.emitStartGame(this.#game.gameData);
  };

  #selecetSquare = (row, col, playerId) => {
    // check if the desired square is selected
    const isSelected = this.#game.selectSquare(row, col, playerId);
    if (isSelected) {
      // if the square is selected notifies the players
      this.player1.emitUpdateGameData(this.#game.gameData);
      this.player2.emitUpdateGameData(this.#game.gameData);

      // check if the game is over if it is notifies the players
      this.#game.checkIsGameover().then((isGameover) => {
        if (isGameover) {
          this.player1.emitGameover(this.#game.gameoverMap);
          this.player2.emitGameover(this.#game.gameoverMap);
          this.closeRoom();
        }
      });
    }
  };

  closeRoom = () => {
    this.player1.socket.disconnect();
    this.player2.socket.disconnect();
  };
}

module.exports = Room;
