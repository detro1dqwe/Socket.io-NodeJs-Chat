var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log("Успешное соедение");
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log("Успешное отключение");
    });

    socket.on('send message', function(data){
        io.sockets.emit('add message', {msg: data.message, name: data.name, className: data.className});
    });

});
