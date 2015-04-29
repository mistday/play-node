var express         = require('express'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    redis           = require('redis'),
    RedisStore      = require('connect-redis')(session),
    // redisClient     = redis.createClient(),
    app             = express();

var routes          = {};
routes.index        = require('./routes');
routes.auth         = require('./routes/auth');
routes.login        = require('./routes/login');
routes.logout        = require('./routes/logout');
routes.notFound     = require('./routes/404');


app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(
  {
    secret: 'secretass',
    // store: new RedisStore({host: 'localhost', port: 6379, client: redisClient}),
    resave: false,
    saveUninitialized: false
  }
));


app.get('/auth', routes.auth);
app.post('/login', routes.login);

// if session
app.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth');
  }
});


app.get('/', routes.index);
// app.get('/auth', routes.auth);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/error', function(req, res) {
  throw new Error;
})


app.all('*', routes.notFound);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


var server = app.listen(3000);