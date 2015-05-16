var i = 0;

var status = {};
status = require('./save-file').status;
var oldStatus = status.value;

module.exports = function(req, res) {
  i = 0
  var resI = setInterval(function() {
    console.log(i++);

    if(oldStatus != status.value) {
      clearInterval(resI);
      oldStatus = status.value;
      res.json({val: status.value});
    }
    if(status.value === '100%') {
      clearInterval(resI);
    }
  }, 250);
};