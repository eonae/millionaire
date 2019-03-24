const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const State = require('./server/state');
const api = require('./server/routes/api');
const StateReport = require('../../server/StateReport');
const app = express();

app.use( session({
  cookie: {
    maxAge: 120000,
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
  if (!(req.session.state))
    req.session.state = new State();
  next();
});

app.get('/', (req, res) => {
  const report = new StateReport(req.session.state).stringify();
  console.log(report);
  res.render(__dirname + '/templates/base.pug', { report });
});

app.use('/api', api);

app.use((req, res) => {
  res.redirect('/');
})

app.listen(4445);
