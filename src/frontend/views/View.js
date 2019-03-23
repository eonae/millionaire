'use strict';

import modals from 'vendor/modals/modals';
import BaseView from 'base/BaseView';

export default class View extends BaseView {
  constructor() {
    super({
      mainLayout: {
        template: 'mainLayout',
        children: {
          mainMenu: {
            template: 'mainMenu',
            slot: '#mainMenu',
            events: [
              { element: '#play', on: 'click', emit: 'play' },
              { element: '#contribute', on: 'click', emit: 'contribute' }
            ]
          },
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
            data: { question: '', answers: [] },
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
              stages: [
                { prize: 1000, immune: false },
                { prize: 2000, immune: true },
                { prize: 5000, immune: false },
                { prize: 6000, immune: true }
              ],
              currentStage: 0 }
          }
        }
      }
    });
  }

  askName() {
    modals.inputBox({ message: 'Please enter your name' }, player => {
      this.emit('changePlayerName', { player } );
    });
  }
};

