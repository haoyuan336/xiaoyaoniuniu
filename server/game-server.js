/**
 * Created by chuhaoyuan on 2017/11/27.
 */
let app = require("express")();
let http = require('http').Server(app);
let socket = require('socket.io');
var io = require('socket.io');
io = socket('3000');

io.on('connection', function (socket) {
    console.log('user connected');
    socket.emit('connected', 'hello');

    socket.on('helloworld', function (msg) {
        console.log('hello world' + msg);
    })
});
