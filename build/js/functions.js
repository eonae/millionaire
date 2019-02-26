"use strict";

function setInnerText(element, value) {
  element.innerText = value;
}

function getLadderTemplate() {
  // Пока так.
  return [{
    prize: 1000,
    isFixed: false
  }, {
    prize: 2000,
    isFixed: true
  }, {
    prize: 5000,
    isFixed: false
  }, {
    prize: 10000,
    isFixed: true
  }];
}

function getQuestion(level) {
  // Здесь нужно реализовать получение вопросов из внешнего источника (нужно чуть больше времени)
  // Пока захардкодим.
  switch (level) {
    case 0:
      return {
        text: 'Сколько звёзд на небе?',
        options: ['Одна', 'Две', 'Тысяча', 'Дофига'],
        correct: 3
      };

    case 1:
      return {
        text: 'Что пьёт корова?',
        options: ['Молоко', 'Виски', 'Воду', 'Энергетики'],
        correct: 2
      };

    case 2:
      return {
        text: 'Настоящее имя бабы-яги?',
        options: ['Кикимора Ивановна', 'Джон Уик', 'Линда Гамильтон', 'Принцесса Несмеяна'],
        correct: 1
      };

    case 3:
      return {
        text: 'Первый принцип костылестроения?',
        options: ['Костылирование', 'Поликостылизм', 'Инкастуляция', 'Костылелогия'],
        correct: 2
      };
  }
}