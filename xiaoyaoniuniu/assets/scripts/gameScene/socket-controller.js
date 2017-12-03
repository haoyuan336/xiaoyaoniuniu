import global from './../global'
cc.Class({
  extends: cc.Component,
  properties: {
    
  },
  onLoad: function () {
    global.socket = SocketIO.connect('http://localhost:3002');
    global.socket.on('connection', this.onConnection.bind(this));
    global.socket.on('login', this.loginSuccenss.bind(this));
    global.socket.on('enter_room', this.enterRoomCb.bind(this))
  },
  login: function () {
    let uid = '' + new Date().getTime() + Math.floor(Math.random() * 10000);
    let auth  = 'abs';
    global.socket.emit('login', {uid: uid, auth: auth});
    //向服务器发送登录的消息
  },
  loginSuccenss: function (data) {
    console.log('登录成功' + JSON.stringify(data));
    data = JSON.parse(data);
    if (data.success === true){
      console.log('登录成功');
      //登录成功进入游戏
      this.enterRoom();
    }
  },
  onConnection: function (data) {
    data = JSON.parse(data);
    if (data.isConnected){
      cc.log("链接成功");
      this.login();
    }
  },
  enterRoomCb: function (data) {
    // console.log('enter room ' + JSON.stringify(data));
    data = JSON.parse(data);
    if (data.success === true){
      console.log('进入房间成功' + JSON.stringify(data.res));
      global.event.fire('enter_room_success', data.res);
    }else {
      console.log('加入房间失败' + data.res);
    }
  },
  enterRoom: function () {
    // cc.log('enter toom' + global.account.playerData.roomId);
    global.socket.emit('enter_room',{roomid: '706504'});
    // global.socket.emit('enter_room', {roomid: global.account.playerData.roomId});
  }
});