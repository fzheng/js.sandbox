module.exports = function (app) {
  app.disable('x-powered-by');

  app.post('/not/imported', function (req, res) {
    console.log(req.params.num);
  });
};