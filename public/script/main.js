// setup
var socket = io();

// send keyword
socket.emit('keyword', 'kobani');

// listen for results
socket.on('data', function(data) {
    console.log(data);
});
