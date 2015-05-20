var fs          = require('fs'),
    multiparty  = require('multiparty');

var files = {},
    pc = 1;


var savefile = function(req, res) {
  var hash,
      firstData = true;
      form = new multiparty.Form();
  

  form.on('error', function(err) {
    
    console.log('Error parsing form: ' + err.stack);
  });
 

  form.on('part', function(part) {

    if (part.filename !== null) {

      part.on('data', function(data) {

        if(firstData) {
          firstData = false;
          hash = JSON.parse(data.toString()).val;
          
          // create obj
          files[hash] = {
            value: hash,
            total: 0,
            multiple: null,
            compare: null,
            portion: (part.byteCount * (pc/100)),
            hashReceived: false,
            error: null,
            status: {
              value: 0,
              _value: 0
            },
            loop: null
          }
          // -----------
        } else {
          files[hash].total += data.length;
          if(files[hash].total >= files[hash].compare) {
            files[hash].multiple = (files[hash].total / files[hash].portion).toFixed(4);
            files[hash].compare = files[hash].portion + files[hash].portion * files[hash].multiple;

            // -------
            files[hash].status.value = Math.ceil(pc*files[hash].multiple)+'%';
            // -------
          }
        }

      });

      var ws = fs.createWriteStream('./uploads/' + part.filename); 
      ws.on('error', function(err) {
        console.log(err);
        status[hash].error = true;
      });

      part.pipe(ws);
    }
  });


  form.on('close', function() {
    console.log('Upload completed!');
    res.end();
  });
  form.parse(req);
}

module.exports = savefile;
module.exports.status = files;