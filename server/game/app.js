const config = require('./../config.json');
const serverConfig = config.gameServerConfig;
const socket = require('socket.io');
const db = require('./../utility/db');
const app = socket(serverConfig.port);
app.on('connection', function (socket) {
    console.log('a user connection');
    socket.on('enter_room', function (uid, roomid) {
        //取出房间信息
    });
});
