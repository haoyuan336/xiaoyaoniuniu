let playerList = [];
let room = require('./room');
let player = function (uid,socket) {
  let that = {};
  let _uid = uid;
  let _seatId = 0;
  let _nickName = "小明" + Math.floor(Math.random() * 100);
  let _avatar = 'https://mp.weixin.qq.com/misc/getheadimg?fakeid=3266140778&token=637221831&lang=zh_CN';
  socket.on('enter_room', function (data) {
    console.log('enter room' + JSON.stringify(data));
    data = JSON.parse(data);
    room.addPlayerToRoom(that, data.roomid, function (err, data) {
      //加入房间的操作
      console.log('data  = ' + JSON.stringify(data));
      if (err){
        console.log('err' + err);
        socket.emit('enter_room', {success: false, res: err});
      }else {
        socket.emit('enter_room', {success: true, res: data});
      }
    });

    // socket.emit('enter_room_success', {isSuccess: true});

  });

  //取出玩家信息
  socket.emit('login', {success: true,res: {
    uid: _uid,
    nickName: _nickName,
    avatar: _avatar
  }});

  that.getUid = function () {
    return _uid;
  };
  that.getSeatIndex = function () {
    return _seatId;
  };
  that.initData = function (data) {
    console.log('初始化数据' + JSON.stringify(data));
    _seatId =data.seatId;
    socket.emit({
      seatId: _seatId,
      uid: _uid,
      nickName: _nickName,
      avatar: _avatar
    })

  };
  that.syncData = function (data) {

  };
  that.getPublicData = function () {
    return {
      uid: _uid,
      avatar: _avatar,
      nickName: _nickName,
      seatId: _seatId
    }
  };
  return that;
};
exports.createPlayer = function () {
  playerList.push(player.apply(this, arguments));
};