var interf = require("johnny-five");
var board = new interf.Board();

board.on("ready", function() {

    var start, end;
    var doorOpen = true;
    const coolDown = 10000;

    const pinLayout = {
        pins: {
            red: 11, 
            green: 10,
            blue: 9
        }
    };

    const turnAllOff = (leds) => {
        leds.map(led => led.off());
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

    var leds {
        yellow: new interf.Led(3),
        green: new interf.Led(4),
        red: new interf.Led(5)
    };

    var ledButton = new interf.Button(2);
    var rgbButton = new interf.Button(13);

    var rgbLed = new interf.Led.RGB(pinLayout);
    var rgbState = false;

    ledButton.on('down', () => {
        turnAllOff();
        if (doorOpen) {
            doorOpen = false;
            start = new Date();
            leds.red.on();
        } else {
            doorOpen = true;
            end = new Date();
            if ((end - start) > coolDown) {
                leds.yellow.on();
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
