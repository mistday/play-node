var redisClient     = require('redis').createClient();

var index = function(req, res) {
  res.render('index', {'login': req.session.login});
}

module.exports = index;