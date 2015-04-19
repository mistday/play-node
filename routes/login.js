var login = function(req, res) {
	req.session.cookie.maxAge = 60*60*1000;
	req.session.login = req.body.login;
	res.redirect('/');
}

module.exports = login;