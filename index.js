'use strict';

const server = require('./src/server');

// Start the server
server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});