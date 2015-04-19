var index = function(req, res) {
  console.log(req.session);
  res.render('index', {'login': req.session.login});
}

module.exports = index;