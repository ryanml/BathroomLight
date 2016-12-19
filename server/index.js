'use strict';
exports.light = (http) => {
    var jfLib = require("johnny-five");
    var board = new jfLib.Board();
    var sock = require('socket.io')(http);

    board.on("ready", function() {

        const coolDown = 5000;
        const longLimit = 10000;

        const leds = {
            yellow: new jfLib.Led(3),
            green: new jfLib.Led(4),
            red: new jfLib.Led(5)
        };

        const pinLayout = {
            pins: {
                red: 11, 
                green: 10,
                blue: 9
            }
        };

        const ledButton = new jfLib.Button(2);
        const rgbButton = new jfLib.Button(13);

        const rgbLed = new jfLib.Led.RGB(pinLayout);

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

        // We presumably start with the door open
        sock.on('connection', (conn) => {
            var start, end;
            var doorOpen = true,
            rgbState = false;

            leds.green.on();

            ledButton.on('down', () => {
                turnAllOff(leds);
                if (doorOpen) {
                    doorOpen = false;
                    start = new Date();
                    leds.red.on();
                    conn.emit('close');
                } else {
                    doorOpen = true;
                    end = new Date();
                    if ((end - start) > longLimit) {
                        leds.yellow.on();
                        conn.emit('caution');
                        setTimeout(() => {
                            leds.yellow.off();
                            leds.green.on();
                            conn.emit('open');
                        }, coolDown);

                    } else {
                        leds.green.on();
                        conn.emit('open');
                    }
                }
            });
            
            rgbButton.on('down', () => {
                if (!rgbState) {
                    var hex = randomHex();
                    rgbLed.color(
                        hex
                    );
                    rgbLed.on();
                    rgbState = true;
                    conn.emit('rgb-on', hex);
                } else {
                    rgbLed.off();
                    rgbState = false;
                    conn.emit('rgb-off');
                }
            });

        });

    });
}