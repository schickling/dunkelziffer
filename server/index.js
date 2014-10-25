var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var crawler = require('./crawler');

// provider
var kavkaz = require('./provider/kavkaz');

io.on('connection', function(socket) {

    socket.on('keyword', function() {
        var p = crawler('russia', kavkaz);

        p.then(function(data) {
            socket.emit('data', data);
        });
    });

});

app.use(express.static(__dirname + '/../public'));

server.listen(4000);
console.log('Local webserver started at localhost:4000');
