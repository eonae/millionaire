'use strict';

import BaseController from 'base/BaseController';

export default class Controller extends BaseController {

  constructor(views) {

    super(views);
    this.state = views.game.model;

    state.on('error', args => {
      if (this.activeView) {
        this.activeView.error(args);
      }
    });

    state.on('change', changed => {
      if (changed.inProgress === true) this.show(views.game);
      if (changed.inProgress === false) this.show(views.main);
    });
    state.on('win', res => {
      views.game.win(res);
    });
    state.on('loss', res => {
      views.game.loss(res);
    });
    state.on('flee', res => {
      views.game.flee(res);
    });
    state.on('correct', res => {
      views.game.correct();
    });

    views.main.on('newPlayer', args => {
      state.setPlayer(args.player);
    });

    views.main.on('contribute', args => {
      alert('contribute!');
    });

    views.main.on('play', args => {
      state.startNewGame();
    });
    views.game.on('play', args => {
      state.startNewGame();
    })

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