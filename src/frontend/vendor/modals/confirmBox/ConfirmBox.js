'use strict';

import ModalWindow from 'vendor/modals/base/ModalWindow.js'

export default class ConfirmBox extends ModalWindow {

  constructor(data, callback) {
    const settings = Object.assign({
      buttons: {
        positive: 'Yes',
        negative: 'No'
      },
      message: ''
    }, (data instanceof Object) ? data : { message: data });
    super('confirmBox', settings, callback);
  }

  show() {

    this.open();
    const buttons = document.querySelector('.modal-window .buttons');
    buttons.addEventListener('click', (e) => {
      this.output = e.target.id === 'positive';
      console.log(this.output);
      this.close();
    });
  }
}