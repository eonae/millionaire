'use strict';

import View from 'views/View';
import State from 'models/State';
import MainController from 'controllers/MainController';

window.onload = () => {
  window.initialState = JSON.parse(document.getElementById('state').innerHTML);
  window.state = new State(initialState);
  debugger;
  window.view = new View();
  window.controller = new MainController(view, state);
};