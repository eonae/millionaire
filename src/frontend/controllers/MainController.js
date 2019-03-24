'use strict';

export default class MainController {
  constructor(view, state) {

    state.on('status_change', (args) => {
      this.updateStatus(args.value);
    });

    state.on('player_change', args => {
      this.updatePlayerName(args.value);
    });

    state.on('serverError', args => {
      view.error(args);
    });

    state.on('loss', args => {
      view.loss(args);
    });

    state.on('win', args => {
      view.win(args);
    });


    view.on('newPlayer', args => {
      state.setPlayer(args.player);
    });

    view.on('contribute', args => {
      alert('contribute!');
    });

    view.on('play', args => {
      state.startNewGame();
    });

    this.updateStatus(state.status)
    this.updatePlayerName(state.player);
    if (state.status == 'playing') {
      this.updateLadder(state.ladder);
      this.updateCurrentPosition(state.currentPosition);
      this.updateQuestion(state.question, state.options);
    }
  }

  updateStatus(status) {
    {
      switch (status) {
        case 'incognito':
          view.switchTo('mainLayout');
          view.askName();
          break;
        case 'idle':
          view.switchTo('mainLayout');
          break;
        case 'playing':
          view.switchTo('gameLayout');
          break;
      }
    }
  }

  updatePlayerName(player) {
    view.mainLayout.greetings.setData( { player } );
    view.gameLayout.player.setData( { player } );
  }

  updateQuestion(question, options) {
    view.gameLayout.question.setData( { question, options });
  }

  updateLadder(stages) {
    view.gameLayout.ladder.setData( { stages });
  }

  updateCurrentPosition(currentStage) {
    view.gameLayout.ladder.setData( { currentStage });
  }
}