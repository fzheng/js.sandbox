module.exports = function (app) {
  app.disable('x-powered-by');

  app.post('/imported', function (req, res) {
    console.log(req.params.num);
  });
};