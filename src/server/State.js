

module.exports = class State {
  constructor() {
    this.player = 'mr. Incognito';
    this.currentGame = null;
    this.status = 'incognito';
  }

  static createReport(state) {
    const report = {
      player: state.player,
      status: state.status
    }
    if (state.currentGame) {

      const game = require('../game/game.js').readFrom(state.currentGame);
      report.gameStatus = game.status;
      report.ladder = game.ladder;
      report.currentPosition = game.currentPosition;
      report.question = game.currentQuestion.text;
      report.options = game.currentQuestion.options;
    }
    return JSON.stringify(report);
  }
}