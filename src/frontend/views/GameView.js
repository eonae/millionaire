'use strict';

import modals from 'vendor/modals/modals.js';
import Component from 'base/Component';

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
    debugger;
    modals.confirmBox( { message:
      `We are really sorry, but you are wrong (((<br>
      Correct answer was
      ${String.fromCharCode(args.correct + 65)}: ${args.options[args.correct]}
      Would you play once more?`}, (oneMore) => {
        if (oneMore) alert('One more!');
      });
  }

  win(prize) {
    modals.confirmBox( { message:
      `Congratulations! You were really great!
      Your prize: ${prize}
      Would you play once more?`}, (oneMore) => {
        if (oneMore) alert('One more!');
      });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }

};

