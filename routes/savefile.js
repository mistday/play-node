var fs          = require('fs'),
    multiparty  = require('multiparty');

var savefile = function(req, res) {
  console.log('body: ', req.body);
  console.log('files: ', req.files);

  var form = new multiparty.Form();
  
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

  form.on('part', function(part) {
    if (part.filename === null) {
      console.log('1 got field named ' + part.name);
      part.resume();
    }
   
    if (part.filename !== null) {
      var writeStream = fs.createWriteStream('./uploads/' + part.filename);   
      part.pipe(writeStream);
    }

  });

  form.on('close', function() {
    console.log('Upload completed!');
  });

  form.parse(req);
}

module.exports = savefile;