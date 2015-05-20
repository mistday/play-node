var EE = require('events').EventEmitter;
var status = new EE();

var files = require('./save-file').status;

var resArr = {};

setInterval(function() {
  var key;
  for(key in files) {
    status.emit('up', files[key].value);
  }
}, 1000)

module.exports = function(req, res) {
  resArr[req.query.hash] = res;
};


status.on('up', function(hash) {
  console.log('up');
  console.log('hash - ', hash);
  
  resArr[hash].json({val: files[hash].status.value});
  
  if(files[hash].status.value === '100%') {
    delete resArr[hash];
    delete files[hash];
  }
});