const repo = require('./repo');
const getLadder = require('./ladder');

function getQuestion(ladder, stage, playedQuestionIds) {

    debugger;
    const question = repo.getRandomQuestion(ladder[stage].level, playedQuestionIds);
    if (!question) throw new Error('Unable to find appropriate question');

    return {
        question: {
            id: question.id,
            text: question.text,
            options: question.options
        },
        correct: question.correct         // Правильный ответ выносим отдельно.
    }
}
function isLastRound(game) {
    return (game.stage === game.ladder.length - 1);
}
function maxPrize(game) {
    return this.ladder[game.ladder.length - 1].prize;
}
function lastFixedPrize(game) {
    var prize = 0;
    for (var i = 0; i <= game.stage; i++) {
        if (game.ladder[i].isFixed)
            prize = game.ladder[i].prize;
    }
    return prize;
}

const actions = {

    answer(game, params) {

        if (game.result) return null;               // Если игра уже закончена - ничего не происходит.

        const option = +params.option;

        if (game.correct === option) {             // Верный ответ
        
            if (isLastRound(game)) {                // Последний раунд - победа!    
            
                return {
                    result: 'WIN',
                    inProgress: true,
                    playedQuestionIds: [ ...playedQuestionIds, game.question.id ],
                    prize: maxPrize(game)
                };

            } else {                              // Следующий вопрос!
            
                const nextStage = game.stage++;
                return {
                    stage: nextStage,
                    prize: game.ladder[nextStage].prize,
                    question: getNextQuestion(game.ladder, nextStage, playedQuestionIds).question
                };
            }

        } else {                                 // Неверный ответ
        
            return {
                result: 'LOSS',
                inProgress: false,
                prize: lastFixedPrize(game),
                mistake: option
            }
        }
    },

    flee(game) {

        if (game.stage == 0 || game.result) {
            return null;
        } else {
            return {
                result: 'FLEE',
                inProgress: false
            };
        }
    },
    
    fifty(game) {

        if (game.result || !game.hints.fifty) {
            return false; // игра уже закончилась или подсказка уже использована.

        } else {
            const optionsToDisable = [ 0, 1, 2, 3 ].filter(o => o !== game.correct);
            delete optionsToDisable[Math.floor(Math.random() * 3)];
            const reducedOptions = [ ...game.question.options ];
            for (let index of optionsToDisable) {
                reducedOptions[index] = 'disabled';
            }

            const hints = Object.assign({}, this.hints);
            hints.fifty = false;

            return {
                question: {
                    id: game.question.id,
                    text: game.question.text,
                    options: reducedOptions
                },
                hints
            }
        }
    },

    abandone (game) {
        if (game.result) {
            return null;
        } else {
            return {
                result: 'ABANDONED',
                inProgress: false
            }
        }
    }
}

module.exports = class Game {

    // Объект Game может быть создан либо с нуля либо из сохранённого state.

    static create() {
        const game = {
            inProgress: true,
            ladder: getLadder(),
            stage: 0,
            result: null,
            playedQuestionIds: [],
            prize: 0,
            hints: {
                fifty: true
            }
        };
        const { question, correct } = getQuestion(game.ladder, game.stage, game.playedQuestionIds);

        game.playedQuestionIds.push(question.id);  // Добавляем в список сыгранных вопросов.
        game.question = question;
        game.correct = correct;

        return game;
    }

    static play(game, command, params) {
        return actions[command](game, params);
    }
}