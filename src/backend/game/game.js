class GameResult {
    constructor(type, prize) {
        this.type = type;
        this.prize = prize;
    }
}

///////////////////////////////////
/// Private
///////////////////////////////////

function getQuestions(ladder) {

    const questions = [],
          answers = [];

    for (let i = 0; i < ladder.length; i++) {
        let { text, options, correct } = getRandomQuestion(i);
        questions.push( { text, options } );
        answers.push(correct);
    }
    return {
        questions,
        answers
    }
}

function getRandomQuestion(level) {
    // Здесь нужно реализовать получение вопросов из внешнего источника (нужно чуть больше времени)
    // Пока захардкодим.

    switch (level) {
        case 0:
            return {
                text: 'Сколько звёзд на небе?',
                options: [ 'Одна', 'Две', 'Тысяча', 'Дофига'],
                correct: 3
            }
        case 1:
            return {
                text: 'Что пьёт корова?',
                options: [ 'Молоко', 'Виски', 'Воду', 'Энергетики'],
                correct: 2
            }
        case 2:
            return {
                text: 'Настоящее имя бабы-яги?',
                options: [ 'Кикимора Ивановна', 'Джон Уик', 'Линда Гамильтон', 'Принцесса Несмеяна'],
                correct: 1
            }
        case 3:
            return {
                text: 'Третий принцип костылестроения?',
                options: [ 'Костылирование', 'Поликостылизм', 'Инкастуляция', 'Костылелогия'],
                correct: 1
            }
        default:
            return {
                text: 'Нет подходящего вопроса!',
                options: [ 'Верно', 'Неверно', 'Неверно', 'Неверно'],
                correct: 0
            }
    }
}

function createResponse(status, obj) {
    return {
        status,
        obj
    }
}

////////////////////////////////////
/// Internal
////////////////////////////////////

module.exports = class Game {

    constructor() {

        this.ladder = require('./ladder.js');           // Создаём лесенку (призы, несгораемые суммы)
        console.dir(this.ladder);
        this.currentPosition = 0;
        this.status = 'start';
        this.result = null;

        let { questions, answers } = getQuestions(this.ladder);

        console.dir(questions);
        console.log(answers);

        this.questions = questions;
        this.answers = answers;
    }

    get currentQuestion() {
        return this.questions[this.currentPosition];
    }

    get currentAnswer() {
        return this.answers[this.currentPosition];
    }

    get isLastRound() {
        return (this.currentPosition === this.ladder.length - 1);
    }

    get currentPrize() {
        console.log(this.ladder[this.currentPosition].prize)
        return this.ladder[this.currentPosition].prize;
    }

    get maxPrize() {
        return this.ladder[this.ladder.length - 1].prize;
    }

    get lastFixedPrize() {
        var prize = 0;
        for (var i = 0; i <= this.currentPosition; i++) {
            if (this.ladder[i].isFixed)
                prize = this.ladder[i].prize;
        }
        return prize;
    }

///////////////////////////////////
/// API
///////////////////////////////////

    try(params, callback) {
        console.log('Command - "try"');

        console.log(+(params.option));

        let correct = (this.currentAnswer === (+(params.option)) );
        console.log(this.currentAnswer + ' ');
        console.log(correct);
        
        if (correct) {
            if (this.isLastRound) {
                this.status = 'finished';
                this.result = new GameResult(
                    'win',
                    this.maxPrize
                );
                callback(null, createResponse(this.status, this.result));
            } else {
                this.currentPosition++;
                this.status = 'promoting';
                callback(null, createResponse(this.status, {}) );
            }
        }
        else {
            this.status = 'finished';
            this.result = new GameResult(
                'defeat',
                this.lastFixedPrize
            )
            callback(null, createResponse(this.status, this.result));
        }
    }

    question(params, callback) {
        console.log('Command - "question"');
        callback(null, createResponse(this.currentQuestion));
    }

    flee(params, callback) {

        console.log('Command - "flee"');

        this.status = 'finished';
        this.result = new GameResult(
            'flee',
            this.currentPrize
        );
    
        callback(null, createResponse(this.status, this.result));
    }
}