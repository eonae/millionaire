const questions = [
  {
    id: 0,
    level: 0,
    text: 'Сколько звёзд на небе?',
    options: [ 'Одна', 'Две', 'Тысяча', 'Дофига'],
    correct: 3
  },
  {
    id: 1,
    level: 0,
    text: 'Что пьёт корова?',
    options: [ 'Молоко', 'Виски', 'Воду', 'Энергетики'],
    correct: 2
  },
  {
    id: 2,
    level: 1,
    text: 'Настоящее имя бабы-яги?',
    options: [ 'Кикимора Ивановна', 'Джон Уик', 'Линда Гамильтон', 'Принцесса Несмеяна'],
    correct: 1
  },
  {
    id: 3,
    level: 1,
    text: 'Третий принцип костылестроения?',
    options: [ 'Костылирование', 'Поликостылизм', 'Инкастуляция', 'Костылелогия'],
    correct: 1    
  }
]

class QuestionRepo {

  constructor(questions) {
      this._questions = questions;
  }

  // Возвращает id случайного вопроса требуемого level

  getRandomQuestion(level, played) {

    const filtered = this._questions.filter(q => q.level === level && played.indexOf(q.id) === -1);
    switch (filtered.length) {
        case 0: return null;
        case 1: return filtered[0];
        default: return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }
}

module.exports = new QuestionRepo(questions);