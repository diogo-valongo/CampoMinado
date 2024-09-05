// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  socket.on('mensagem', (data) => {
    console.log('Mensagem recebida:', data);
    io.emit('mensagem', data); // Envia a mensagem para todos os clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
