import View from 'views/base/View';

export default class MainView extends View {

  constructor() {
    super('mainView', {
      buttonPlay: '#play',
      buttonContribute: '#contribute',
    }, {
      name: '.greetings span'
    });
  }

  initControls() {
    this.controls.buttonPlay.addEventListener('click', (e) => {
      alert('play!');
      this.emit('play', {});

    });
    this.controls.buttonContribute.addEventListener('click', (e) => {
      alert('contribute!');
      this.emit('contribute', {});
    });
  }
}
