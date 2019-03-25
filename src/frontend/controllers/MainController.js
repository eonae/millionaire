'use strict';

import { assertRestElement } from "babel-types";

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
    state.on('ladder_change', args => {
      this.updateLadder(state.ladder);
    })
    state.on('question_change', args => {
      this.updateQuestion(state.question);
    })
    state.on('options_change', args => {
      this.updateOptions(state.options)
    });

    view.on('newPlayer', args => {
      state.setPlayer(args.player);
    });

    view.on('contribute', args => {
      alert('contribute!');
    });

    view.on('play', args => {
      debugger;
      state.startNewGame(); 
    });
    
    view.on('try', args => {
      console.log(args);
      const option = args.nativeEvent.target.id.split('_')[1];
      console.log(option);
    })

    this.updateStatus(state.status)
    this.updatePlayerName(state.player);
    if (state.status == 'playing') {
      debugger;
      this.updateLadder(state.ladder, state.currentPosition);
      this.updateCurrentPosition(state.currentPosition);
      this.updateQuestion(state.question);
      this.updateOptions(state.options);
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

  updateQuestion(question) {
    view.gameLayout.question.setData( { question });
  }

  updateOptions (options) {
    view.gameLayout.question.setData( { options });
  }

  updateLadder(ladder, currentPosition) {
    view.gameLayout.ladder.setData( { ladder, currentPosition });
  }

  updateCurrentPosition(currentStage) {
    view.gameLayout.ladder.setData( { currentStage });
  }
}