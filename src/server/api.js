const express = require('express');
const router = express.Router();
const Game = require('./game/game.js');
const helpers = require('./helpers');

router.get('/:api', (req, res) => {

  const command = req.params.api,
        params = req.query;
  
  switch (command) {

    case 'state':
      res.send(helpers.createReport(req.session));
      break;

    case 'new':
      req.session.game = Game.create();                         // Создаём "чистый" game-state. Проверять есть активная игра или нет проще на клиенте
      res.send(helpers.serialize(req.session.game));                    // Отправляем state
      break;

    case 'player':

      req.session.player = params.player;
      res.send(helpers.serialize( { player : req.session.player } ));
      break;
  
    default:

      if (!req.session.game) res.redirect('/');                 // Активной игры нет - редиректим на главную

      const changes = Game.play(req.session.game, command, params);

      if (changes === null)
        res.sendStatus(406);                                    // Действие невозможно (рассинхронизация клиента и сервера или взлом клиента.
                                                          // При получении этого кода, клиенту пожалуй стоит перезапуститься.
      req.session.game = (changes.result)
        ? null                                            // В будущем перед удалением можно добавить сохранение результата
        : Object.assign(req.session.game, changes);       // Применяем изменения и сохраняем их в сессию

      res.send(helpers.serialize(changes));
  }
});

module.exports = router;

