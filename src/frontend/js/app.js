import IntroView from 'views/introView';
import GameView from 'views/gameView';
import ModalWindow from 'views/modal';
import util from 'util.js';

const introView = new IntroView();
const gameView = new GameView();

gameView.btnHintHalf.addEventListener('click', (event) => {
    debugger;
    var test = new ModalWindow();
    test.open({ message: 'My Message!'});
});

gameView.btnHintPercent.addEventListener('click', (event) => {
    debugger;
    var test = new ModalWindow();
    test.open({ message: 'My Message!'});
});

introView.setStartHandler(() => {
    
    util.ajax('api/new', null,  (error, result) => {
        if (error) {
            console.dir(error);
        } else {
            introView.toggle();
            gameView.toggle();
            // create LadderView(result);
            requireQuestion();
        }
    });
});

//////////////////// GameView

gameView.btnQuit.addEventListener('click', () => {
    gameView.toggle();
    introView.toggle();
});

gameView.optionButtonsPanel.addEventListener('click', (event) => {

    if ( [ '0', '1', '2', '3' ].includes(event.target.id) ) {
        util.ajax('api/try', { option: +event.target.id }, (error, result) => {
            if (error) {
                console.dir(error);
            } else if (result.status == 'promoting') {
                requireQuestion();
            } else if (result.params.type == 'win') {
                alert('you win!');
            } else {
                alert('You loose!');
            }
        });
    }
});

gameView.btnFlee.addEventListener('click', function() {
    alert('btn-flee');
    util.ajax('api/flee', null, (error, result) => {
        if (error) {
            console.dir(error);
        } else {
            if (result.status == 'finished') {
                alert('You flee!');
            } else {
                alert('It\'s not a good time to flee - you hadn\'t answered any questions yet!');
            }
        }
    });
});

////////////////

function requireQuestion() {
    util.ajax('api/question', null, (error, result) => {
        if (error) {
            console.dir(error);
        } else {
            console.dir(result);
            gameView.showQuestion(result.params);
        }
    });
}