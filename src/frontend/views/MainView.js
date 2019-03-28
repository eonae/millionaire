'use strict';

import modals from 'vendor/modals/modals.js';
import Component from 'base/Component';

export default class MainView extends Component {
  constructor(model) {
    super({
        template: 'mainLayout',
        events: [
          { element: '#play', on: 'click', emit: 'play' },
          { element: '#contribute', on: 'click', emit: 'contribute' }
        ],
        children: {             
          greetings: {
            template: 'greetings',
            slot: '#greetings',
            uses: ['player']
          }
        }
    }, model);
  }

  askName() {
    modals.inputBox({ message: 'Please enter your name' }, player => {
      this.emit('newPlayer', { player } );
    });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }
};

