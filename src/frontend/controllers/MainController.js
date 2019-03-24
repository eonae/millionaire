'use strict';

export default class MainController {
  constructor(view, state) {

    debugger;
    this.updatePlayerName(state.player);
    this.updateLadderStages(state.ladder);
    this.updateQuestion(state.question);
    state.status = 0;

    {

    }

    state.on('status_change', (args) => {
      this.updateStatus(args.status);
    });

    state.on('player_change', args => {
      this.updatePlayerName(args.player);
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
      state.player = args.player;
    });

    view.on('contribute', args => {
      alert('contribute!');
    });

    view.on('play', args => {
      state.startNewGame();
    });
  }

  updateStatus(status) {
    {
      switch (status) {
        case 'incognito':
          view.switchTo('mainLayout');
          view.askName();
          break;
        case 'welcome':
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

  updateQuestion(question, answers) {
    view.gameLayout.question.setData( { question, answers });
  }

  updateLadderStages(stages) {
    view.gameLayout.ladder.setData( { stages });
  }

  updateLadderCurrentStage(currentStage) {
    view.gameLayout.ladder.setData( { currentStage });
  }

  setPlayerName(player) {
    state._player = player;
  }

}