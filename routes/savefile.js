var savefile = function(req, res) {
	console.log('body: ', req.body);
	console.log('files: ', req.files);
}

module.exports = savefile;