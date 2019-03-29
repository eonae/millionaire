'use strict';

import modals from 'vendor/modals/modals.js';
import Component from 'base/Component.js';
import templates from 'views/templates.js';

export default class GameView extends Component {
  constructor(model) {
    super({
        template: 'gameLayout',
        children: {
  
          player: {
            template: 'player',
            slot: '#player',
            uses: [ 'player' ]
          },
      
          hints: {
            template: 'hints',
            slot: '#hints',
            events: [
              { element: '#hint-0', on: 'click', emit: 'hint_0' },
              { element: '#hint-1', on: 'click', emit: 'hint_1' },
              { element: '#hint-2', on: 'click', emit: 'hint_2' },
            ]
          },
      
          menu: {
            template: 'menu',
            slot: '#menu'
          },
      
          question: {
            template: 'question',
            slot: '#question',
            uses: [ 'question' ],
            events: [
              { element: '#option-0', on: 'click', emit: 'try' },
              { element: '#option-1', on: 'click', emit: 'try' },
              { element: '#option-2', on: 'click', emit: 'try' },
              { element: '#option-3', on: 'click', emit: 'try' }
            ]
          },
      
          ladder: {
            template: 'ladder',
            slot: '#ladder',
            uses: [ 'ladder', 'stage' ]
          }
        }
        
    }, model);
  }

  loss(args) {

    modals.confirmBox(templates.render_lossMessage({

      letter: String.fromCharCode(args.correctOption + 65),
      option: this.model.question.options[args.correctOption],
      prize: args.prize

    }), (oneMore) => {
        if (oneMore)
          this.emit('play', {});
      });
  }

  win(args) {

    modals.confirmBox(templates.render_winMessage({
      prize: args.prize
    }), (oneMore) => {
      if (oneMore)
        this.emit('play', {});
      });
  }

  correct() {
    modals.messageBox({
      message: templates.render_correctMessage(),
      buttons: { positive: 'Continue' }
     });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }

};

