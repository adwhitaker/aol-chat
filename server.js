const WebSocket = require('ws');
const express = require('express');

const app = express();

const server = new WebSocket.Server({ server: app.listen(8080) });

server.on('connection', socket => {
    socket.on('message', message => {
        server.clients.forEach(client => {
            console.log('message', message)
            client.send(message);
        });
    });
});
