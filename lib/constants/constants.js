const events = {
  server: {
    wait_for_player: "server::waitForPlayer",
    start_game: "server::startGame",
    update_board: "server::updateGameData",
    gameover: "server::gameover",
  },
  client: {
    select_square: "client::selectSquare",
  },
};

module.exports = { events };
