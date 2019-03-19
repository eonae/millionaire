const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pug = require('express-pug');

// const gameController = require('./deprecated/backend/game/gameController.js');
// const gameManager = require('./server/gameManager.js/index.js');

const app = express();

app.set('view engine', 'pug');

app.use( logger('dev') );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( express.static(__dirname + '/static') );

app.get('/', (req, res) => {
  res.render(__dirname + '/templates/blocks/mainView.pug', {
    player: 'Sergey Aleksandrovich'
  });
});

app.get('/game', (req, res) => {
  res.render(__dirname + '/templates/blocks/gameView.pug', {
    player: 'Sergey Aleksandrovich'
  });
});

// app.get('/api/:api', (req, res) => {
//   gameController.callApi(req.params.api, req.query, (error, result) => {
//     if (error) throw error;
//     res.send(result);
//   })
// });

// app.post('/propose', (req, res) => {
//   // Предложить вопрос
// });
// //




// app.get('/api/:api', (req, res) => {
//   console.log(req.params);
// });

app.listen(4445);
