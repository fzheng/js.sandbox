'use strict';

const marked = require('marked');
const fs = require('fs');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const args = process.argv.slice(2);
if (args.length == 0) {
  throw 'node index.js guidance/file/path';
}

// Add the route
server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    fs.readFile(args[0], 'utf8', (err, data) => {
      if (err) throw err;
      const guidance = JSON.parse(data);
      let advice = (guidance.advice.length) ? guidance.advice[0] : guidance.advice;
      return reply(marked(advice.evidence, {sanitize: true}));
    });
  }
});

// Start the server
server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});