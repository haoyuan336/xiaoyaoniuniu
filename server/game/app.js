const config = require('./../config.json');
const serverConfig = config.gameServerConfig;
const socket = require('socket.io');
const db = require('./../utility/db');
const app = socket(serverConfig.port);
const playercontrol = require('./player');

const dbConfig = config.dbconfig;
db.connect({
  user: dbConfig.user,
  pswd: dbConfig.password,
  db: dbConfig.db
});
app.on('connection', function (socket) {
    console.log('a user connection');
    socket.on('login', function (data) {
      console.log('login = ' + JSON.stringify(data));
      data = JSON.parse(data);
      let uid = data.uid;
      let auth = data.auth;
      console.log('uid  ' + uid);
      //todo 验证用户名跟auth
      playercontrol.createPlayer(uid,socket);
      //返回登录成功的消息
    });
    socket.emit('connection', {isConnected: true});
    // socket.on('enter_room', function (uid, roomid) {
    //     //取出房间信息
    // });
});
