(function() {
    var time, socket = io();

    const setText = (c, a, t) => {
        var info = document.getElementById('info');
        var status = document.getElementById('status');
        status.className = c;
        status.innerHTML = a;
        info.innerHTML = t;
    };

    socket.on('open', () => {
        setText(
            'open', 
            'The bathroom door is open.', 
            ''
        );
        clearInterval(time);
    });

    socket.on('caution', () => {
        var seconds = 5;
        setText(
            'caution', 
            'The bathroom door is open but it probably smells.', 
            'Safe to enter in 5 seconds'
        );
        clearInterval(time);
        time = setInterval(() => {
            seconds--;
            document.querySelector('#info')
            .innerHTML = `Safe to enter in ${seconds} seconds.`;
        }, 1000);
    });

    socket.on('close', () => {
        var seconds = 1;
        setText(
            'closed', 
            'The bathroom door is closed.', 
            'Shut for 0 seconds'
        );
        time = setInterval(() => {
            document.querySelector('#info')
            .innerHTML = `Shut for ${seconds} seconds`;
            seconds++;
        }, 1000);
    });
})();