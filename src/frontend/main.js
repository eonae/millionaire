'use strict';

import View from 'views/View';
import State from 'models/State';
import MainController from 'controllers/MainController';

window.onload = () => {
  // window.view = initializeView();
  // view.gameLayout.render();


  window.view = new View();
  window.state = new State();
  window.controller = new MainController(view, state);

};

  // debugger;
  // window.controller = new MainController({
  //   mainView: new MainView(),
  //   gameView: new GameView()
  // });

  // controller.update();


  // util.ajax('/state', {}, state => {
  //   switch (state.status) {
  //     case 0:
        
  //       break;
  //     case 1:
  //       break;
  //     case 2:
  //   }

  //   document.body.innerHTML = templates.render_gameView();
  //   const btn0 = document.getElementById('0');
  //   console.log(btn0);
  // });

  // Дальше в зависимости от полученного state рисуем основное окно.

// window.onload = () => {
  
//   modals.inputBox('Please enter your name', data => {
//     util.ajax('/name', { name: data }, () => {
//       const $name = document.querySelector('.greetings span');
//       $name.textContent = data;
//     });
//   });
// };


// modals.confirmBox('Hello, My little friend!', data => alert(data));
// modals.inputBox('Please enter your name!', data => alert(data));
// debugger;
// const introView = new IntroView();
// const gameView = new GameView();
// // const answer = modal.confirmBox('?');
// // const input = modal.inputBox(' ');


// gameView.btnHintHalf.addEventListener('click', (event) => {
//     debugger;
//     var test = new ModalWindow();
//     test.open({ message: 'My Message!'});
// });

// gameView.btnHintPercent.addEventListener('click', (event) => {
//     debugger;
//     var test = new ModalWindow();
//     test.open({ message: 'My Message!'});
// });

// introView.setStartHandler(() => {
    
//     util.ajax('api/new', null,  (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             introView.toggle();
//             gameView.toggle();
//             // create LadderView(result);
//             requireQuestion();
//         }
//     });
// });

// //////////////////// GameView

// gameView.btnQuit.addEventListener('click', () => {
//     gameView.toggle();
//     introView.toggle();
// });

// gameView.optionButtonsPanel.addEventListener('click', (event) => {

//     if ( [ '0', '1', '2', '3' ].includes(event.target.id) ) {
//         util.ajax('api/try', { option: +event.target.id }, (error, result) => {
//             if (error) {
//                 console.dir(error);
//             } else if (result.status == 'promoting') {
//                 requireQuestion();
//             } else if (result.params.type == 'win') {
//                 alert('you win!');
//             } else {
//                 alert('You loose!');
//             }
//         });
//     }
// });

// gameView.btnFlee.addEventListener('click', function() {
//     alert('btn-flee');
//     util.ajax('api/flee', null, (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             if (result.status == 'finished') {
//                 alert('You flee!');
//             } else {
//                 alert('It\'s not a good time to flee - you hadn\'t answered any questions yet!');
//             }
//         }
//     });
// });

// ////////////////

// function requireQuestion() {
//     util.ajax('api/question', null, (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             console.dir(result);
//             gameView.showQuestion(result.params);
//         }
//     });
// }