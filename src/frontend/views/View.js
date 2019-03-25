'use strict';

import modals from 'vendor/modals/modals.js';
import LayoutSwitch from 'base/LayoutSwitch';

export default class View extends LayoutSwitch {
  constructor() {
    super({
      mainLayout: {
        template: 'mainLayout',
        events: [
          { element: '#play', on: 'click', emit: 'play' },
          { element: '#contribute', on: 'click', emit: 'contribute' }
        ],
        children: {             
          greetings: {
            template: 'greetings',
            slot: '#greetings',
            data: { player: 'dear friend' }
          }
        }
      },
      gameLayout: {
        template: 'gameLayout',
        children: {
  
          player: {
            template: 'player',
            slot: '#player',
            data: { player: 'Incognito' },
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
            data: { question: '', options: [] },
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
            data: {
              ladder: [
                { prize: 1000, isFixed: false },
                { prize: 2000, isFixed: true },
                { prize: 5000, isFixed: false },
                { prize: 6000, isFixed: true }
              ],
              currentPosition: 0 }
          }
        }
      }
    });
  }

  loss(args) {
    modals.confirmBox( { message:
      `We are really sorry, but you are wrong (((
      Correct answer was
      ${String.fromCharCode(args.correct + 65)}: ${this.question.answers[args.correct]}
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

