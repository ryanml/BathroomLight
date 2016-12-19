'use strict';
exports.light = () => {
    var jfLib = require("johnny-five");
    var board = new jfLib.Board();

    board.on("ready", function() {

        var start, end;
        var doorOpen = true,
        rgbState = false;

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

        /*
         * Main 
         */

        // We presumably start with the door open
        leds.green.on();

        ledButton.on('down', () => {
            turnAllOff(leds);
            if (doorOpen) {
                doorOpen = false;
                start = new Date();
                leds.red.on();
            } else {
                doorOpen = true;
                end = new Date();
                if ((end - start) > longLimit) {
                    leds.yellow.on();
                    setTimeout(() => {
                        leds.yellow.off();
                        leds.green.on();
                    }, coolDown);

                } else {
                    leds.green.on();
                }
            }
        });
        
        rgbButton.on('down', () => {
            if (!rgbState) {
                rgbLed.color(
                    randomHex()
                );
                rgbLed.on();
                rgbState = true;
            } else {
                rgbLed.off();
                rgbState = false;
            }
        });

    });
}