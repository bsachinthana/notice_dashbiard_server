import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.use('/', express.static(path.join(__dirname, 'public')));

const connections = [];

io.sockets.on('connection',(socket) => {
    connections.push(socket);
    console.log(' %s sockets is connected', connections.length);
 
    socket.on('disconnect', () => {
       connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('update', (data) => {
      console.log(data);
        io.sockets.emit('new-data',data);
     });
 });

 http.listen(3000, function(){
  console.log('listening on *:3000');
});