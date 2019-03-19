import util from 'util.js';
import Component from 'base/component.js';

let _gw = document.querySelector('.gameScreen');

export default class GameView extends Component {

    constructor() {
        super();
        var elems = util.getElements('#quit', '#flee', '#percent', '#half', '.question', '.options');
        //debugger;
        //Object.assign(this, util);

        this.btnQuit = document.querySelector('#quit');
        this.btnFlee = document.querySelector('#flee');
        this.btnHintPercent = document.querySelector('#percent');
        this.btnHintHalf = document.querySelector('#half');
        this.questionField = document.querySelector('.question');
        this.optionButtonsPanel = document.querySelector('.options');
        this.optionButtons = Array.from(this.optionButtonsPanel.children);
    }

    toggle() {
        _gw.classList.toggle('hidden');
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
    showQuestion(question) {
        const buttons = this.optionButtonsPanel.children;
        util.setInnerText(this.questionField, question.text);
        for (var i = 0; i < this.optionButtons.length; i++) {
            util.setInnerText(this.optionButtons[i], question.options[i]);
        }
    }
}