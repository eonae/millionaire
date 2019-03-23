import Component from 'views/base/Component';

class View {
  constructor(tree) {
    for (let layout of Object.entries(tree)) {
      this[layout[0]] = new Component(layout[1]);
    }
  }

  switchTo(layout) {
    this[layout].render();
  }
}

export default function initializeView() {

  return new View({
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
};
