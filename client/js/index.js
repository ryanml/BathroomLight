(function() {
    'use strict';
    var time;
    var socket = io(); 

    socket.on('open', () => {
        var field = document.querySelector('p');
        var label = document.querySelector('h2');
        label.className = 'open';
        label.innerHTML = 'The bathroom door is open.';
        field.innerHTML = '';
        clearInterval(time);
    });

    socket.on('caution', () => {
        var field = document.querySelector('p');
        var label = document.querySelector('h2');
        var seconds = 5;
        label.className = 'caution';
        label.innerHTML = 'The bathroom door is open but it probably smells.';
        field.innerHTML = 'Safe to enter in 5 seconds';
        clearInterval(time);
        time = setInterval(() => {
            seconds--;
            field.innerHTML = `Safe to enter in ${seconds} seconds.`;
        }, 1000);
    });

    socket.on('close', () => {
        var field = document.querySelector('p');
        var label = document.querySelector('h2');
        var seconds = 1;
        label.className = 'closed';
        label.innerHTML = 'The bathroom door is closed.';
        field.innerHTML = 'Shut for 0 seconds';
        time = setInterval(() => {
            field.innerHTML = `Shut for ${seconds} seconds`;
            seconds++; 
        }, 1000);
    });

    socket.on('rgb-on', (hex) => {
        var strong = document.querySelector('strong');
        strong.style = `display:block;color:${hex}`;
    });

    socket.on('rgb-off', () => {
        var strong = document.querySelector('strong');
        strong.style = '';
    });
})();