'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: 3000
});

// Register bell with the server
server.register(require('bell'), function (err) {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: '3e51deef6e9e1e0bd26773aa73182638',
    clientId: '1624182834575793',
    clientSecret: '',
    isSecure: false
  });

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: '3e51deef6e9e1e0bd26773aa73182638',
    clientId: '356012859098-thv9q3haut671egumqmv6tq09vg8133d.apps.googleusercontent.com',
    clientSecret: '',
    isSecure: false
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/facebook/login',
    config: {
      auth: 'facebook',
      handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }
        return reply.redirect('/');
      }
    }
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/google/login',
    config: {
      auth: 'google',
      handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }
        return reply.redirect('/');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply('Hello World');
      }
    }
  });

  server.start();
});