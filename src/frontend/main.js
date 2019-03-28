'use strict';

import State from 'models/State';
import Controller from 'controllers/Controller';
import GameView from 'views/GameView';
import MainView from 'views/MainView';

window.onload = () => {

  window.state = new State();

  window.controller = new Controller({
    main: new MainView(state),
    game: new GameView(state)
  });

  window.initialState = JSON.parse(document.getElementById('state').innerHTML);

  debugger;

  state.set(initialState);

  const activeView = (state.inProgress)
    ? controller.views.game
    : controller.views.main;
  controller.show(activeView);
};