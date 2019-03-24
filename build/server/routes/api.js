const express = require('express');
const router = express.Router();
const StateReport = require('../../server/StateReport');
const Game = require('../../game/game.js');

router.get('/:api', (req, res) => {
  console.log('router is online...');
  debugger;
  const command = req.params.api,
        params = req.query;
        state = req.session.state;
  
  switch (command) {

    case 'new':
      state.currentGame = new Game();
      state.status = 'playing';
      res.send(new StateReport(state).stringify());
      break;
  
    case 'quit':
      state.currentGame = null;
      state.status = 'welcome';
      res.sendStatus(200);
      break;
  
    default:
      if (state.currentGame && state.currentGame.status != 'finished' && (command in state.currentGame)) {
        state.currentGame[command](params, (err, gameResponse) => {
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

