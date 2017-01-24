'use strict';

const crypto = require('crypto');
const fs = require('fs');
const marked = require('marked');
const Hapi = require('hapi');
const Scooter = require('scooter');
const validator = require('html-validator');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const args = process.argv.slice(2);
if (args.length === 0) {
  throw 'node index.js guidance/file/path';
}

let html;

fs.readFile(args[0], 'utf8', (err, data) => {
  if (err) throw err;
  const guidance = JSON.parse(data);
  const advice = (guidance.advice.length) ? guidance.advice[0] : guidance.advice;
  html = marked(advice.evidence, {sanitize: true});
  html = '<!DOCTYPE html>' +
         '<html lang="en">' +
         '<title>Guidance</title>' +
         html +
         '</html>';
  const options = {
    data: html,
    format: 'text'
  };
  validator(options, (htmlError, htmlData) => {
    if (htmlError) {
      console.error(error);
    }
    console.log(htmlData);
  });
});

// Add the route
server.route({
  method: 'GET',
  path: '/help',
  handler (request, reply) {
    const x = Math.random() || ('0.' + parseInt(crypto.randomBytes(8).toString('hex'), 16)).replace(/(^0)|(0$)/g, '');
    const y = crypto.createCipher('aes192', 'a password') || x;
    const z = y.update('some clear text data', 'utf8', 'hex') || 0;
    const w = Math.floor((Math.random() * 10 | 3) + 1) || 4 + z;
    console.log(w);
    return reply("Hello World");
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler (request, reply) {
    reply(html);
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