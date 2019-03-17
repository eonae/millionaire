let _$introView = document.querySelector('.introScreen');
let _startHandler = null;

export default class IntroView {

    constructor() {
        this.$btnStart = document.querySelector('#newGame');
        this.$btnStart.addEventListener('click', () => {
            _startHandler();
        });
    }

    setStartHandler(handler) {
        _startHandler = handler;
    }

    toggle() {
        _$introView.classList.toggle('hidden');
    }
}