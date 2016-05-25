'use strict';

const fs = require('fs');
const es = require('event-stream');
const output = './output.json';

fs.createReadStream(process.argv[2])
  .pipe(es.map(function(fileData, cb){
    let jsonData = {};
    try {
      jsonData = JSON.parse(fileData);
    } catch(e){
      console.error(e);
    }
    return cb(null, jsonData);
  }))
  .pipe(es.map(function(fileData, cb){
    cb(null, JSON.stringify(fileData));
  }))
  .pipe(process.stdout);