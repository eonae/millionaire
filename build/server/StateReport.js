module.exports = class StateReport {
  constructor(state) {
    this.player = state.player;
    this.status = state.status;
    if (state.currentGame) {
      this.gameStatus = state.currentGame.status;
      this.ladderStages = state.currentGame.ladder;
      this.ladderCurrentStage = state.currentGame.currentPosition;
      this.question = state.currentGame.currentQuestion.text;
      this.answers = state.currentGame.currentQuestion.options;
    }
  }

  stringify() {
    return JSON.stringify(this);
  }
}
