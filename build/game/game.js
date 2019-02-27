module.exports = class Game {

    constructor() {
        this.rounds = createLadder();
        this.current = 0;
        this.status = 'start';
        this.prize = 0;
        this.hints = {
            half: true,
            percents: true
        }
    }

    get currentQuestion() {
        return this.rounds[this.current].question;
    }

    try(params, callback) {
        console.log('try');
        console.log(+(params.option));
        let correct = (this.currentQuestion.correct === (+(params.option)) );
        console.log(correct);
        if (correct) {
            this.current++;
            if (this.current === this.rounds.length) {
                this.win(callback);
            } else {
                this.status = 'promote';
                callback(null, { promote: true } );
            }
        }
        else {
            this.loose(callback);
        }
    }
    /// Работает!!!

    loose(callback) {
        console.log('loose');
        this.status = 'loose';
        this.prize = getMaxFixedPrize(this.rounds, this.current);
        callback(null, { loose: true });
    }

    win(callback) {
        console.log('win');
        this.status = 'win';
        this.prize = this.rounds[this.rounds.length - 1].prize;
    }

    flee() {
        console.log('flee');
        this.status = 'flee';
        this.prize = this.rounds[this.current - 1].prize;
    }
}

function getMaxFixedPrize(ladder, current) {
    var prize = 0;
    for (var i = 0; i < current; i++) {
        if (ladder[i].isFixed)
            prize = ladder[i].prize;
    }
    return prize;
}

function createLadder() {
    var ladder = getLadderTemplate();
    for (var i = 0; i < ladder.length; i++) {
        ladder[i].question = getQuestion(i);
    }

    return ladder;
}

function getLadderTemplate() {
    // Пока так.
    return [
        {
            prize: 1000,
            isFixed: false,
        },
        {
            prize: 2000,
            isFixed: true
        },
        {
            prize: 5000,
            isFixed: false
        },
        {
            prize: 10000,
            isFixed: true
        }
    ];
}


function getQuestion(level) {
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
                text: 'Первый принцип костылестроения?',
                options: [ 'Костылирование', 'Поликостылизм', 'Инкастуляция', 'Костылелогия'],
                correct: 2
            }
    }
}