import ModalWindow from 'views/modal/base/ModalWindow.js'

export default class ConfirmBox extends ModalWindow {

  constructor(data, callback) {
    const settings = Object.assign({
      buttons: {
        positive: 'Continue',
        negative: 'Back'
      },
      placeholder: 'Your input',
      message: ''
    }, (data instanceof Object) ? data : { message: data });
    super('inputBox', settings, callback);
  }

  show() {

    this.open();
    const buttons = document.querySelector('.modal-window .buttons');
    buttons.addEventListener('click', (e) => {
      this.output = (e.target.id === 'positive')
        ? document.getElementById('modal-input').value
        : undefined;
      console.log(this.output);
      this.close();
    });
  }
}