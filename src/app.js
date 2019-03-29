const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const api = require('./server/api');
const helpers = require('./server/helpers');

const app = express();

app.use( session({
  cookie: {
    maxAge: 30000,
  },
  store: new MongoStore({ url: 'mongodb://heroku_gbhd59v3:kvp3hjqthcj71832oj27ucdosj@ds221271.mlab.com:21271/heroku_gbhd59v3'}),
  // store: new MongoStore({ url: 'mongodb://localhost/millionaire'}),
  secret: 'wow, what a GAME!',
  resave: true,
  saveUninitialized: false
}));

app.use( logger('dev') );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( express.static(__dirname + '/static') );

app.use( (req, res, next) => {

  if (!(req.session.player)) {
    console.log('new session: ' + req.sessionID.toString());
    req.session.player = 'guest';
    req.session.game = null;
  }
  next();

});

app.get('/', (req, res) => {   
                                                                                                                              
  const report = helpers.createReport(req.session);
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

app.listen(process.env.PORT || 4445);
