var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var crawler = require('./crawler');
var readdir = require('fs').readdirSync;

io.on('connection', function(socket) {

    socket.on('keyword', function(keyword) {
        var currentKeyword = keyword;
        readdir(__dirname + '/provider/list').forEach(function(file) {
            var provider = require('./provider/list/' + file);
            crawler(currentKeyword, provider).then(function(data) {
                data.keyword = currentKeyword;
                socket.emit('data', data);
            });
        });
    });

});

app.use(express.static(__dirname + '/../public'));

server.listen(4000);
console.log('Local webserver started at localhost:4000');
