'use strict';

export default class MainController {
  constructor(view, state) {

    state.on('status_change', (args) => {
      switch (args.value) {
        case 0:
          view.switchTo('mainLayout');
          view.askName();
          break;
        case 1:
          view.switchTo('mainLayout');
          break;
        case 2:
          view.switchTo('gameLayout');
      }
    });

    view.on('changePlayerName', args => {
      state._player = args.player;
      view.mainLayout.greetings.setData({ player: args.player });
      view.gameLayout.player.setData({ player: args.player });

    })

    view.on('contribute', args => {
      alert('contribute!');
    });
    view.on('play', args => {
      state.status = 2;
    });
  }
}