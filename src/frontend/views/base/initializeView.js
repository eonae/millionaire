import Component from 'views/base/Component';

// mainLayout.greetings.setData({ name: 'Sergey'});

export default function initializeView() {

  return {
    mainLayout: new Component({
      template: 'mainLayout',
      children: {
    
        mainMenu: new Component({
          template: 'mainMenu',
          slot: '#mainMenu',
          events: [
            { element: '#play', on: 'click', emit: 'play' },
            { element: '#contribute', on: 'click', emit: 'contribute' }
          ]
        }),
    
        greetings: new Component({
          template: 'greetings',
          slot: '#greetings',
          data: { player: 'dear friend' }
        })
      }
    }),

    gameLayout: new Component({

      template: 'gameLayout',
      children: {
    
        player: new Component({
          template: 'player',
          slot: '#player',
          data: { player: '' },
        }),
    
        hints: new Component({
          template: 'hints',
          slot: '#hints',
          events: [
            { element: '#hint-0', on: 'click', emit: 'hint_0' },
            { element: '#hint-1', on: 'click', emit: 'hint_1' },
            { element: '#hint-2', on: 'click', emit: 'hint_2' },
          ]
        }),
    
        menu: new Component({
          template: 'menu',
          slot: '#menu'
        }),
    
        question: new Component({
          template: 'question',
          slot: '#question',
          data: { question: '', answers: [] },
          events: [
            { element: '#option-0', on: 'click', emit: 'option_0' },
            { element: '#option-1', on: 'click', emit: 'option_1' },
            { element: '#option-2', on: 'click', emit: 'option_2' },
            { element: '#option-3', on: 'click', emit: 'option_3' }
          ]
        }),
    
        ladder: new Component({
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
        })
      }
    })
  }
}