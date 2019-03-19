import MessageBox from 'views/modal/MessageBox';

// void messageBox(message, [{ options }])
// void messageBoxAsync(message, callback, [{ options }])
// string inputBox(message, [{options}])
// string inputBoxAsync(message, callback, [options]);
// bool confirmBox()
// bool confirmBoxAsync()



export default {
  messageBox(message, options) {
    new MessageBox()
      .show(message, options);
  },

  messageBoxAsync(message, callback, options) {
    new MessageBox()
      .showAsync(message, callback, options)
  }

  
}