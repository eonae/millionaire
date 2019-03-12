import IntroView from './view/introView';
import GameView from './view/gameView';

const introView = new IntroView();
const gameView = new GameView();

introView.setStartHandler(() => {
    
    ajax('api/new', null,  (error, result) => {
        if (error) {
            console.dir(error);
        }
        else {
            introView.toggle();
            gameView.toggle();
            console.dir(result);
        }
    });
});

//////////////////// GameView

for (var i = 0; i < gameView.optionButtons.length; i++) {
    gameView.optionButtons[i].value = i;
}

gameView.btnQuit.addEventListener('click', function() {
    gameView.toggle();
    introView.toggle();
});

gameView.btnFlee.addEventListener('click', function() {
    if (gameView._currentGame.current != 0) {
        gameView._currentGame.flee();
        gameView.update();
    } else {
        alert('Вам пока нечего забирать!');
    }
});

gameView.optionButtons[0].addEventListener('click', function()
{
    view._currentGame.tryAnswer(0);
    view.update();
});

gameView.optionButtons[1].addEventListener('click', function()
{
    gameView._currentGame.tryAnswer(1);
    gameView.update();
});

gameView.optionButtons[2].addEventListener('click', function()
{
    gameView._currentGame.tryAnswer(2);
    gameView.update();
});

gameView.optionButtons[3].addEventListener('click', function()
{
    ajax('api/try', )
    gameView._currentGame.tryAnswer(3);
    gameView.update();
});


////////////////


function ajax(url, params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', constructGetUrl(url, params));
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            callback(JSON.parse(xhr.responseText));
        }
        else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };
}

function constructGetUrl(url, paramsObj) {
    let query = url;
    if (paramsObj && Object.keys(paramsObj).length != 0) {
        let delim = '?';
        for (let key in paramsObj) {
            query += `${delim}${key}=${paramsObj[key]}`;
        }
    }
    return query;
}