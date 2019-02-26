function initializeView() {
    var view = {

        _game: null,

        mainScreen: document.querySelector('.mainScreen'),
        gameScreen: document.querySelector('.gameScreen'),

        btnStart: document.querySelector('#newGame'),
        btnQuit: document.querySelector('#quit'),
        btnFlee: document.querySelector('#flee'),
        btnHintPercent: document.querySelector('#percent'),
        btnHintHalf: document.querySelector('#half'),
        questionField: document.querySelector('.question'),
        optionButtons: Array.from(document.querySelectorAll('.option')),

        update: function() {
            var nextPrize = this._game.rounds[this._game.current].prize;
            var prize = this._game.prize;
            switch (this._game.status) {
                case 'start':
                    alert(`Вопрос на ${nextPrize}р.`); // Будет другое.
                    this.showQuestion();
                    break;
                case 'promote':
                    alert('Всё верно!');
                    alert(`Вопрос на ${nextPrize}р.`); // Будет другое.
                    this.showQuestion();
                    break;
                case 'loose':
                    alert(`Вы проиграли! Ваш выирыш составил ${prize}p.`);
                    view.mainScreen.classList.remove('hidden');
                    view.gameScreen.classList.add('hidden');
                    break;
                    // тяп ляп.. не успеваю.
                case 'flee':
                    alert(`Вы забрали деньги! Ваш выирыш составил ${prize}p.`);
                    view.mainScreen.classList.remove('hidden');
                    view.gameScreen.classList.add('hidden');
                    break;
                    // тяп ляп.. не успеваю.
                case 'win':
                    alert(`Вы выиграли! Ваш выирыш составил ${prize}p.`);
                    view.mainScreen.classList.remove('hidden');
                    view.gameScreen.classList.add('hidden');
                    break;
            }
        },

        showQuestion: function() {
            var question = this._game.getCurrentQuestion();
            setInnerText(this.questionField, question.text);
            for (var i = 0; i < this.optionButtons.length; i++) {
                setInnerText(this.optionButtons[i], question.options[i]);
            }
        }
    }

    for (var i = 0; i < view.optionButtons.length; i++) {
        view.optionButtons[i].value = i;
    }

    view.btnStart.addEventListener('click', function() {
        view.mainScreen.classList.add('hidden');
        view.gameScreen.classList.remove('hidden');
        game = createGame();
        view._game = game;
        view.update();
    });
    
    view.btnQuit.addEventListener('click', function() {
        view.mainScreen.classList.remove('hidden');
        view.gameScreen.classList.add('hidden');
    });

    view.btnFlee.addEventListener('click', function() {
        if (view._game.current != 0) {
            view._game.flee();
            view.update();
        } else {
            alert('Вам пока нечего забирать!');
        }


    });


    // Хотел обойтись циклом, но не смог придумать, как обойти замыкание.
    // for (var i = 0; i < view.optionButtons.length; i++) {
    //     view.optionButtons[i].addEventListener('click', function(){
    //         view._game.checkAnswer(view.optionButtons[i].value);
    //     });
    // }


    // Как решается эта проблема в реальной жизни? jQuery?

    view.optionButtons[0].addEventListener('click', function()
    {
        view._game.tryAnswer(0);
        view.update();
    });

    view.optionButtons[1].addEventListener('click', function()
    {
        view._game.tryAnswer(1);
        view.update();
    });
    
    view.optionButtons[2].addEventListener('click', function()
    {
        view._game.tryAnswer(2);
        view.update();
    });
    
    view.optionButtons[3].addEventListener('click', function()
    {
        view._game.tryAnswer(3);
        view.update();
    });

    return view;
}