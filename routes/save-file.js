var fs          = require('fs'),
    multiparty  = require('multiparty');
    
var fileSize,
    total = 0,
    bufferSize,
    multiple,
    PC = 1,
    comparePC,
    onePC,
    status = {},
    firstData = true;

var savefile = function(req, res) {
  var hash;
  firstData = true;

  var form = new multiparty.Form();
  
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });
  
  form.on('part', function(part) {
    total = 0;
    bufferSize = form._writableState.highWaterMark;
    fileSize = part.byteCount;
    onePC = (fileSize * (PC/100));
    comparePC = onePC;

    if (part.filename !== null) {

      part.on('data', function(data) {

        if(firstData) {
          firstData = false;
          hash = JSON.parse(data.toString()).val;
          

          status[hash] = {
            value: 0,
            valueOld: 0,
            error: null
          }


        } else {
          total += data.length;
          if(total >= comparePC) {
            var multiple = (total / onePC).toFixed(4);
            comparePC = onePC + onePC * multiple;

            // ---------------------------
            status[hash].value = Math.ceil(PC*multiple)+'%';
            // ---------------------------
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
module.exports.status = status;