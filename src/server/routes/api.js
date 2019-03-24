const express = require('express');
const router = express.Router();
const State = require('../State');
const Game = require('../../game/game.js');

router.get('/:api', (req, res) => {
  console.log('router is online...');
  const command = req.params.api,
        params = req.query;
        state = req.session.state;
  
  switch (command) {

    case 'new':
      state.currentGame = new Game();
      state.status = 'playing';
      res.send(State.createReport(state));
      break;
  
    case 'player':
      state.player = params.player;
      state.status = 'idle';
      res.send({});
      break;
    case 'quit':
      state.currentGame = null;
      state.status = 'idle';
      res.send({});
      break;
  
    default:
      if (state.currentGame && state.currentGame.status != 'finished') {
        const currentGame = Game.readFrom(state.currentGame);
        currentGame[command](params, (err, gameResponse) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.send(JSON.stringify(gameResponse));
          }
        });
      } else {
        res.sendStatus(500);
      }
  }

});


// app.post('/propose', (req, res) => {
//   // Предложить вопрос
// });

module.exports = router;

