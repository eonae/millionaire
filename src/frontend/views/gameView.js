import View from 'views/base/View.js';

export default class GameView extends View {

  constructor() {
    super('gameView', {
        buttonQuit: '#quit',
        buttonFlee: '#flee',
        buttonFifty: '#fifty',
        buttonMenu: '#menu',
        optionButtons: '.options'
    }, {
        name: '.players div:last-child',
        question: '.question-text',
        option0: '#option-0',
        option1: '#option-1',
        option2: '#option-2',
        option3: '#option-3'
    });
  }

  initControls() {
    this.controls.buttonQuit.addEventListener('click', (e) => {
      this.emit('quit', {});
      alert('quit');
    });
    this.controls.Flee.addEventListener('click', (e) => {
      alert('flee!');
      this.emit('flee', {});
    });
  }
}