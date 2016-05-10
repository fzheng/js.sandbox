var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.get('/redirect', function (req, res) {
  res.redirect(302, '/static/application.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});