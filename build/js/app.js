/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/frontend/js/view/introView.js
// let _currentGame = null;

let _$introView = document.querySelector('.introScreen');
let _startHandler = null;

class IntroView {

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
// CONCATENATED MODULE: ./src/frontend/js/util.js
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

/* harmony default export */ var util = ({

    // Обёртка над обыкновенным XHR-запросом.
    // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.
    ajax(url, params, callback) {
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
    },

    setInnerText(element, value) {
        element.textContent = value;
    }

});
// CONCATENATED MODULE: ./src/frontend/js/view/gameView.js


let _$gameView = document.querySelector('.gameScreen');

class gameView_GameView {

    constructor() {
        this.btnQuit = document.querySelector('#quit');
        this.btnFlee = document.querySelector('#flee');
        // this.btnHintPercent = document.querySelector('#percent');
        // this.btnHintHalf = document.querySelector('#half');
        this.questionField = document.querySelector('.question');
        this.optionButtonsPanel = document.querySelector('.options');
        this.optionButtons = Array.from(this.optionButtonsPanel.children);
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
    showQuestion(question) {
        util.setInnerText(this.questionField, question.text);
        for (var i = 0; i < this.optionButtons.length; i++) {
            util.setInnerText(this.optionButtons[i], question.options[i]);
        }
    }

    // showQuestion() {
    // }
}
// CONCATENATED MODULE: ./src/frontend/js/app.js




const introView = new IntroView();
const gameView = new gameView_GameView();

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

for (var app_i = 0; app_i < gameView.optionButtons.length; app_i++) {
    gameView.optionButtons[app_i].value = app_i;
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

/***/ })
/******/ ]);