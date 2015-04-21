var index = function(req, res) {
  res.render('index', {'user': req.session.user});
}

module.exports = index;