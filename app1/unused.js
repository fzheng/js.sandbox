module.exports = function (app) {
  app.disable('x-powered-by');

  app.post('/not/imported', function (req, res) {
    res.send(req.params.num);
  });
};
