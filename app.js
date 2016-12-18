var interface = require("johnny-five");
var board = new interface.Board();

board.on("ready", function() {

    const pinLayout = {
        pins: {
            red: 3, 
            green: 5,
            blue: 6
        }
    };

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

    var light = new interface.Led.RGB(pinLayout);

    light.on();
    setInterval(function() {
        var hex = randomHex();
        light.color(hex);
        light.blink(2000);
    }, 4000);
});