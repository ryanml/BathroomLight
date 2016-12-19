'use strict';
exports.socket = (http) => {

  var sock = require('socket.io')(http);
  var light = require('./light');

  sock.on('connection', (conn) => {
    console.log('connected');
    light.light();
  });

}