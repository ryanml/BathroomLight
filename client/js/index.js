(function() {
    var socket = io(); 

    socket.on('open', () => {
        var label = document.querySelector('h2');
        label.className = 'open';
        label.innerHTML = 'The bathroom door is open.';
    });

    socket.on('caution', () => {
        var label = document.querySelector('h2');
        label.className = 'caution';
        label.innerHTML = 'The bathroom door is open but it probably smells.';
    });

    socket.on('close', () => {
        var label = document.querySelector('h2');
        label.className = 'closed';
        label.innerHTML = 'The bathroom door is closed.';
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