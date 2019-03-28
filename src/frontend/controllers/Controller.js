'use strict';

import BaseController from 'base/BaseController';

export default class Controller extends BaseController {

  constructor(views) {
    debugger;
    super(views);
    this.state = views.game.model;

    state.on('error', args => {
      if (this.activeView) {
        this.activeView.error(args);
      }
    });

    state.on('change_inProgress', () => {
      if (state.inProgress) this.show(views.game);
      else this.show(views.main);
    });

    views.main.on('newPlayer', args => {
      state.setPlayer(args.player);
    });

    views.main.on('contribute', args => {
      alert('contribute!');
    });

    views.main.on('play', args => {
      debugger;
      state.startNewGame();
    });

    views.main.on('activate', () => {
      if (!state.player || state.player == 'guest') views.main.askName();
    });

    views.game.on('try', args => {
      const option = +args.nativeEvent.target.id.split('-')[1];
      state.tryAnswer(option);
    });

    views.game.on('fifty', state.fifty);
  }
}