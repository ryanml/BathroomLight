'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var server = require('./server');

const PORT = 8000;

app.set('port', PORT);

app.use(
    express.static(
        path.join(
            __dirname, 'client'
        )
    )
);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

server.light(http);

http.listen(app.get('port'), '0.0.0.0', function(arg) {
  console.log('Server listening on port 8000');
});

