var login = function(req, res) {
	req.session.login = req.body.login;
	res.redirect('/');
}

module.exports = login;