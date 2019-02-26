"use strict";

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
    update: function update() {
      var nextPrize = this._game.rounds[this._game.current].prize;
      var prize = this._game.prize;

      switch (this._game.status) {
        case 'start':
          alert("\u0412\u043E\u043F\u0440\u043E\u0441 \u043D\u0430 ".concat(nextPrize, "\u0440.")); // Будет другое.

          this.showQuestion();
          break;

        case 'promote':
          alert('Всё верно!');
          alert("\u0412\u043E\u043F\u0440\u043E\u0441 \u043D\u0430 ".concat(nextPrize, "\u0440.")); // Будет другое.

          this.showQuestion();
          break;

        case 'loose':
          alert("\u0412\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438! \u0412\u0430\u0448 \u0432\u044B\u0438\u0440\u044B\u0448 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u043B ".concat(prize, "p."));
          view.mainScreen.classList.remove('hidden');
          view.gameScreen.classList.add('hidden');
          break;
        // тяп ляп.. не успеваю.

        case 'flee':
          alert("\u0412\u044B \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u0434\u0435\u043D\u044C\u0433\u0438! \u0412\u0430\u0448 \u0432\u044B\u0438\u0440\u044B\u0448 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u043B ".concat(prize, "p."));
          view.mainScreen.classList.remove('hidden');
          view.gameScreen.classList.add('hidden');
          break;
        // тяп ляп.. не успеваю.

        case 'win':
          alert("\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438! \u0412\u0430\u0448 \u0432\u044B\u0438\u0440\u044B\u0448 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u043B ".concat(prize, "p."));
          view.mainScreen.classList.remove('hidden');
          view.gameScreen.classList.add('hidden');
          break;
      }
    },
    showQuestion: function showQuestion() {
      var question = this._game.getCurrentQuestion();

      setInnerText(this.questionField, question.text);

      for (var i = 0; i < this.optionButtons.length; i++) {
        setInnerText(this.optionButtons[i], question.options[i]);
      }
    }
  };

  for (var i = 0; i < view.optionButtons.length; i++) {
    view.optionButtons[i].value = i;
  }

  view.btnStart.addEventListener('click', function () {
    view.mainScreen.classList.add('hidden');
    view.gameScreen.classList.remove('hidden');
    game = createGame();
    view._game = game;
    view.update();
  });
  view.btnQuit.addEventListener('click', function () {
    view.mainScreen.classList.remove('hidden');
    view.gameScreen.classList.add('hidden');
  });
  view.btnFlee.addEventListener('click', function () {
    if (view._game.current != 0) {
      view._game.flee();

      view.update();
    } else {
      alert('Вам пока нечего забирать!');
    }
  }); // Хотел обойтись циклом, но не смог придумать, как обойти замыкание.
  // for (var i = 0; i < view.optionButtons.length; i++) {
  //     view.optionButtons[i].addEventListener('click', function(){
  //         view._game.checkAnswer(view.optionButtons[i].value);
  //     });
  // }
  // Как решается эта проблема в реальной жизни? jQuery?

  view.optionButtons[0].addEventListener('click', function () {
    view._game.tryAnswer(0);

    view.update();
  });
  view.optionButtons[1].addEventListener('click', function () {
    view._game.tryAnswer(1);

    view.update();
  });
  view.optionButtons[2].addEventListener('click', function () {
    view._game.tryAnswer(2);

    view.update();
  });
  view.optionButtons[3].addEventListener('click', function () {
    view._game.tryAnswer(3);

    view.update();
  });
  return view;
}