class TicTacToeGame {
  #playerTurn;
  #gameBoard;
  #gameoverMap;
  #countSelected;

  constructor(firstPlayerId, secondPlayerId) {
    this.firstPlayerId = firstPlayerId;
    this.secondPlayerId = secondPlayerId;
    this.#playerTurn = firstPlayerId;
    this.#countSelected = 0;

    this.#gameBoard = [
      Array(3).fill(null),
      Array(3).fill(null),
      Array(3).fill(null),
    ];

    this.#gameoverMap = {
      winnerId: null,
      winnerPattern: { row: null, col: null, diag: null },
    };
  }

  get gameData() {
    return { playerTurn: this.#playerTurn, board: this.#gameBoard };
  }

  get gameoverMap() {
    return JSON.parse(JSON.stringify(this.#gameoverMap));
  }

  #tooglePlayerTurn = () => {
    if (this.#playerTurn === this.firstPlayerId) {
      this.#playerTurn = this.secondPlayerId;
    } else {
      this.#playerTurn = this.firstPlayerId;
    }
  };

  selectSquare = (row, col, playerId) => {
    if (this.#playerTurn === playerId && this.#gameBoard[row][col] === null) {
      this.#gameBoard[row][col] = this.#playerTurn;
      this.#countSelected += 1;
      this.#tooglePlayerTurn();

      return true;
    }

    return false;
  };

  checkIsGameover = async () =>
    (await this.#checkIsWinner()) || this.#countSelected === 9;

  #checkIsWinner = async () => {
    for (var i = 0; i < this.#gameBoard.length; i++) {
      var checkRows = true;
      var checkColumns = true;
      var checkLeftDiag = true;
      var checkRightDiag = true;

      for (var j = 0; j < this.#gameBoard[i].length - 1; j++) {
        checkRows &=
          this.#gameBoard[i][j] != null &&
          this.#gameBoard[i][j] === this.#gameBoard[i][j + 1];

        checkColumns &=
          this.#gameBoard[j][i] != null &&
          this.#gameBoard[j][i] === this.#gameBoard[j + 1][i];

        checkLeftDiag &=
          this.#gameBoard[j][j] != null &&
          this.#gameBoard[j][j] === this.#gameBoard[j + 1][j + 1];

        var rightDiagCol = this.#gameBoard[i].length - 1 - j;
        checkRightDiag &=
          this.#gameBoard[j][rightDiagCol] != null &&
          this.#gameBoard[j][rightDiagCol] ===
            this.#gameBoard[j + 1][rightDiagCol - 1];
      }

      //console.log({ checkRows, checkColumns, checkLeftDiag, checkRightDiag });

      this.#setWinner(
        checkRows,
        checkColumns,
        checkLeftDiag,
        checkRightDiag,
        i
      );
    }

    var isWinner =
      this.#gameoverMap.winnerPattern.row != null ||
      this.#gameoverMap.winnerPattern.col != null ||
      this.#gameoverMap.winnerPattern.diag != null;

    console.log(isWinner);

    return isWinner;
  };

  #setWinner = (
    checkRows,
    checkColumns,
    checkLeftDiag,
    checkRightDiag,
    rowColIndex
  ) => {
    if (checkRows) {
      this.#gameoverMap.winnerId = this.#gameBoard[rowColIndex][0];
      this.#gameoverMap.winnerPattern.row = rowColIndex;
    }
    if (checkColumns) {
      this.#gameoverMap.winnerId = this.#gameBoard[0][rowColIndex];
      this.#gameoverMap.winnerPattern.col = rowColIndex;
    }
    if (checkLeftDiag) {
      this.#gameoverMap.winnerId = this.#gameBoard[0][0];
      this.#gameoverMap.winnerPattern.diag = 0;
    }
    if (checkRightDiag) {
      this.#gameoverMap.winnerId =
        this.#gameBoard[0][this.#gameBoard[0].length - 1];
      this.#gameoverMap.winnerPattern.diag = 1;
    }
  };
}

module.exports = TicTacToeGame;
