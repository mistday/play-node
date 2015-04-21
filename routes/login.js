var login = function(req, res) {
  if (req.body.login === 'admin' && req.body.pass === '123456') {
    req.session.user = req.body.login;
    res.redirect('/');
  } else {
    res.redirect('/auth');
  }
    
}

module.exports = login;