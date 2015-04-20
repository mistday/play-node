var express         = require('express'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    redis           = require('redis'),
    RedisStore      = require('connect-redis')(session),
    redisClient     = redis.createClient(),
    app             = express();

var routes          = {};
routes.index        = require('./routes');
routes.auth         = require('./routes/auth');
routes.login        = require('./routes/login');
routes.notFound     = require('./routes/404');


app.set('view engine', 'jade');
app.set('views', './views');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(
  {
    secret: 'secretass',
    store: new RedisStore({host: 'localhost', port: 6379, client: redisClient}),
    resave: false,
    saveUninitialized: false
  }
));



app.get('/', routes.index);
app.get('/auth', routes.auth);
app.post('/login', routes.login);



app.all('*', routes.notFound);

var server = app.listen(3000);