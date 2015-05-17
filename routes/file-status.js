var i = 0;

var status = {},
    hash;
status = require('./save-file').status;

setInterval(function() {
  console.log(status);
}, 2000)

module.exports = function(req, res) {
  hash = req.query.hash;
  var resI = setInterval(function() {
    
    // 
    // console.log('interval is work');
    // 

    if(status[hash].error) {
      console.log('error')
      clearInterval(resI);
      return false;
    }

    if(status[hash].valueOld != status[hash].value) {

      // 
      // console.log('STATUS(HASH) - ', status[hash].value);
      // 

      clearInterval(resI);
      status[hash].valueOld = status[hash].value;
      res.json({val: status[hash].value});
    }

    if(status[hash].value === '100%') {
      // console.log('100%');
      delete status[hash]
      clearInterval(resI);
    }
  }, 500);
};