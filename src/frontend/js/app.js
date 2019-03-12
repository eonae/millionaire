import IntroView from './view/introView';
import GameView from './view/gameView';
import util from './util.js';

const introView = new IntroView();
const gameView = new GameView();

introView.setStartHandler(() => {
    
    util.ajax('api/new', null,  (error, result) => {
        if (error) {
            console.dir(error);
        } else {
            introView.toggle();
            gameView.toggle();
            // create LadderView(result)
            requireQuestion();
        }
    });
});

//////////////////// GameView

for (var i = 0; i < gameView.optionButtons.length; i++) {
    gameView.optionButtons[i].value = i;
}

gameView.btnQuit.addEventListener('click', () => {
    gameView.toggle();
    introView.toggle();
});

// gameView.btnFlee.addEventListener('click', function() {
//     if (gameView._currentGame.current != 0) {
//         gameView._currentGame.flee();
//         gameView.update();
//     } else {
//         alert('Вам пока нечего забирать!');
//     }
// });

gameView.optionButtonsPanel.addEventListener('click', (event) => {
    console.log(event.target.id);
    if ( [ 0, 1, 2, 3 ].includes(+event.target.id) ) {
        console.log('includes!');
        util.ajax('api/try', { option: +event.target.id }, (error, result) => {
            if (error) {
                console.dir(error);
            } else if (result.status = "promoting") {
                console.log('requiring');
                requireQuestion();
            } else {
                alert('You loose!');
            }
        });
    }
});

////////////////

function requireQuestion() {
    util.ajax('api/question', null, (error, result) => {
        if (error) {
            console.dir(error);
        } else {
            console.dir(result);
            gameView.showQuestion(result.obj);
        }
    });
}