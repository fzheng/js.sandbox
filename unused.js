module.exports = function (app) {
  app.post('/abc', function (req, res) {
    res.send('Hello World!');
  });
};