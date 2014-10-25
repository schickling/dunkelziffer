var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var crawler = require('./crawler');
var readdir = require('fs').readdirSync;

io.on('connection', function(socket) {

    socket.on('keyword', function(keyword) {

        readdir(__dirname + '/provider').forEach(function(file) {
            var provider = require('./provider/' + file);
            crawler(keyword, provider).then(function(data) {
                socket.emit('data', data);
            });
        });

    });

});

app.use(express.static(__dirname + '/../public'));

server.listen(4000);
console.log('Local webserver started at localhost:4000');
