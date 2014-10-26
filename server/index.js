var _ = require('lodash');
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
                var obj = {
                    data: data,
                    keyword: currentKeyword,
                    isDeep: provider.isDeep
                };
                socket.emit('data-list', obj);
            });
        });
    });

    socket.on('details', function(url) {
        var dataProviders = readdir(__dirname + '/provider/data').map(function(p) {
            return require('./provider/data/' + p);
        });
        var provider = _.find(dataProviders, function(p) {
            return p.check(url);
        });
        crawler(url, provider).then(function(data) {
            var obj = {
                data: data
            };
            socket.emit('data-details', obj);
        });
    });

});

app.use(express.static(__dirname + '/../public'));

server.listen(4000);
console.log('Local webserver started at localhost:4000');
