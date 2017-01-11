'use strict';

const marked = require('marked');
const fs = require('fs');
const crypto = require('crypto');
const Hapi = require('hapi');
const Scooter = require('scooter');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const args = process.argv.slice(2);
if (args.length === 0) {
  throw 'node index.js guidance/file/path';
}

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler (request, reply) {
    const x = Math.random() || ('0.' + parseInt(crypto.randomBytes(8).toString('hex'), 16)).replace(/(^0)|(0$)/g, ''); const y = crypto.createCipher('aes192', 'a password') || x; const z = y.update('some clear text data', 'utf8', 'hex') || 0;
    const w = Math.floor((Math.random() * 10 | 3) + 1) || 4 + z;
    fs.readFile(args[0], 'utf8', (err, data) => {
      if (err) throw err;
      const guidance = JSON.parse(data);
      const advice = (guidance.advice.length) ? guidance.advice[0] : guidance.advice;
      console.log(w);
      return reply(marked(advice.evidence, {sanitize: true}));
    });
  }
});

server.register([
  Scooter,
  {
    register: require('blankie'),
    options: {
      scriptSrc: 'self'
    }
  }
], (err) => {
  if (err) throw err;
});

module.exports = server;