'use strict';

const fs = require('fs');
const es = require('event-stream');
const JSONStream = require('JSONStream');

fs.createReadStream(process.argv[2])
  .pipe(JSONStream.parse('*'))
  .pipe(es.map(function(fileData, cb){
    return cb(null, fileData);
  }))
  .pipe(es.map(function(fileData, cb){
    cb(null, JSON.stringify(fileData));
  }))
  .pipe(process.stdout); // to screen