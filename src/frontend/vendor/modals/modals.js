import MessageBox from './messageBox/MessageBox';
import ConfirmBox from './confirmBox/ConfirmBox';
import InputBox from './inputBox/InputBox';

export default {

  messageBox(options, callback) {
    new MessageBox(options, callback).show();
  },

  confirmBox(options, callback) {
    new ConfirmBox(options, callback).show();
  },

  inputBox(options, callback) {
    new InputBox(options, callback).show();

    /*
      На будущее:
      new InputBox({
        validation: {
          constraint: 'email',
          type: 'submit || 'input'
        },
        placeholder: '...'
      }, (value) => {
        // do something;
      }
      )
    */
  }
}