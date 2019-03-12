function _setInnerText(element, value) {
    element.innerText = value;
}

let _$gameView = document.querySelector('.gameScreen');

export default class GameView {

    constructor() {
        // this.btnQuit = document.querySelector('#quit');
        this.btnFlee = document.querySelector('#flee');
        // this.btnHintPercent = document.querySelector('#percent');
        // this.btnHintHalf = document.querySelector('#half');
        this.questionField = document.querySelector('.question');
        this.optionButtons = Array.from(document.querySelectorAll('.option'));
    }

    toggle() {
        _$gameView.classList.toggle('hidden');
    }
    update() {
        var nextPrize = this._currentGame.rounds[this._currentGame.current].prize;
        var prize = this._currentGame.prize;
        switch (this._currentGame.status) {
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
    }
    showQuestion() {
        var question = this._currentGame.getCurrentQuestion();
        _setInnerText(this.questionField, question.text);
        for (var i = 0; i < this.optionButtons.length; i++) {
            _setInnerText(this.optionButtons[i], question.options[i]);
        }
    }
}