'use strict';
exports.light = (http) => {
    
    var jfLib = require('johnny-five');
    var board = new jfLib.Board();
    var sock = require('socket.io')(http);
    var mongo = require('./mongoWrapper');
    var mongoWrapper = new mongo();

    board.on('ready', function() {

        var start, end;
        var doorOpen = true;
        const coolDown = 5000;
        const longLimit = 10000;
        const leds = {
            red: new jfLib.Led(5),
            green: new jfLib.Led(4),
            yellow: new jfLib.Led(3)
        };
        const button = new jfLib.Button(2);

        const turnAllOff = () => {
            for (var l in leds) {
                if (leds.hasOwnProperty(l)) {
                    leds[l].off();
                }
            }
        }

        const randomHex = () => {
            var hex = '#';
            var chars = 'ABCDEF0123456789';
            for (var inc = 0; inc < 6; inc++) {
                hex += chars[
                    Math.floor(
                        Math.random() * chars.length
                    )
                ];
            }
            return hex;
        };

        const doGreen = (/*c*/) => {
            leds.green.on();
            c.emit('open');
        };

        const doYellow = (/*c*/) => {
            leds.yellow.on();
            c.emit('caution');
        }

        const doRed = (/*c*/) => {
            leds.red.on();
            c.emit('close');
        }

        button.on('down', () => {
            turnAllOff(leds);
            if (doorOpen) {
                doorOpen = false;
                start = new Date();
                doRed(/*c*/);
            } else {
                doorOpen = true;
                end = new Date();
                if ((end - start) > longLimit) {
                    doYellow(/*c*/);
                    setTimeout(() => {
                        leds.yellow.off();
                        doGreen(/*c*/);
                    }, coolDown);
                } else {
                    doGreen(/*c*/);
                }
            }
        });

        doGreen(/*c*/);

    });
}