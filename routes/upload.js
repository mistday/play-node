var upload = function(req, res) {
	console.log(req.method);
	res.render('upload');
}

module.exports = upload;