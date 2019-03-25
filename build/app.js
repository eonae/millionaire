const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const State = require('./server/state');
const api = require('./server/routes/api');

const app = express();

app.use( session({
  cookie: {
    maxAge: 30000,
  },
  store: new MongoStore({ url: 'mongodb://localhost/millionaire'}),
  secret: 'wow, what a GAME!',
  resave: true,
  saveUninitialized: false
}));

app.use(logger('dev'));

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( express.static(__dirname + '/static') );

app.use( (req, res, next) => {

  if (!(req.session.state)) {
    console.log('new session');
    req.session.state = new State();
  }
  next();

});

app.get('/', (req, res) => {
  debugger;                                                                                                                                                                                      
  const report = State.createReport(req.session.state);
  console.log(report);
  res.set({
    'Cache-Control': 'no-cache'
  })
  res.render(__dirname + '/server/base.pug', { report });
});

app.use('/api', api);

app.use((req, res) => {
  res.redirect('/');
})

app.listen(4445);
