var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//Initializa app with routing
app.get('/', function(req, res) {
  var express=require('express');
  app.use(express.static(__dirname + '/public'));
  res.sendFile(path.join(__dirname,'/public', 'index.html'));
});

//register event on socket connection
io.on('connection',function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from,msg);
  });
  socket.on('notifyUser',function(user) {
    io.emit('notifyUser', user);
  });
});

//listen on port 3000
http.listen(3000,function() {
  console.log('listening on port: 3000');
});
