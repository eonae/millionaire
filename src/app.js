const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pug = require('express-pug');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// const gameController = require('./deprecated/backend/game/gameController.js');
// const gameManager = require('./server/gameManager.js/index.js');

const app = express();

app.set('view engine', 'pug');
//app.set('view', __dirname + '/templates');

app.use( session({
  cookie: {
    maxAge: 30000,
  },
  store: new MongoStore({ url: 'mongodb://localhost/millionaire'}),
  secret: 'wow, what a GAME!',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));

app.use((req, res, next) => {
  if (!(req.session.name))
    req.session.count = 1;
  else
    req.session.count++;
  next();
});

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( express.static(__dirname + '/static') );

app.get('/', (req, res) => {
  res.render(__dirname + '/templates/blocks/mainView.pug', {
    player: session.player || 'dear friend!'
  });
});

app.get('/session', (req, res) => {
  res.send(req.session);
});

app.get('/name', (req, res) => {
  if (!(session.name))
    session = req.query.name;
  res.send( {} );
});

app.get('/game', (req, res) => {
  const name = session.name;
  res.render(__dirname + '/templates/blocks/gameView.pug', {
    player: name
  });
});

app.use((req, res) => {
  res.redirect('/');
})

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
