let _db = undefined;
const db = require('./../utility/db')
const Room = function (roomid, player) {
  console.log('创建房间');
  let that = {};
  let _roomId = roomid;
  let _playerList = [];
  const getSeatIndex = function () {
    _playerList.sort(function (a, b) {
      if (a.getSeatIndex() > b.getSeatIndex()){
        return true;
      }
      return false;
    });
    for (let i = 1 ; i < 4 ; i ++){
      if (i <= _playerList.length){
        if (i !== _playerList[i].getSeatIndex()){
          return i;
        }
      }else {
        return i ;
      }
    }
  };
  that.addPlayer = function (player) {

    let index = getSeatIndex();
    console.log('得到座位号' + index);

    _playerList.push(player);
    //
    player.initData({
      seatId: index
    });
    syncRoomData(player);
    //
    //首先是座位号id
    //同步玩家信息
  };
  const syncRoomData = function (player) {
    //首先取出房间里面 ，除了自己的所有玩家的数据
    let playerData = [];
    for(let i = 0 ; i < _playerList.length ; i ++){
      if (player.getUid() !== _playerList[i].getUid()){
        playerData.push(_playerList[i].getPublicData());
      }
    }
    // console.log('player data = ' + JSON.stringify(playerData));
    player.syncData(playerData);
  };
  that.getPlayerCount = function () {
    return _playerList.length;
  };
  if (player){
    that.addPlayer(player);
  }
  return that;
};
let _roomMap = {};
const joinRoom = function (player ,roomid, cb) {
  if (_roomMap.hasOwnProperty(roomid)){
    if (_roomMap[roomid].getPlayerCount() >= 4){
      if (cb){
        cb('room full');
        //房间已满
        return;
      }
    }
    _roomMap[roomid].addPlayer(player);
    //加入房间成功了
    cb(null, {success: true});
  }else {
    _roomMap[roomid] = Room(roomid, player);
  }
};
exports.addPlayerToRoom = function (player, roomId, cb) {
  // console.log('uid' + uid);
  // console.log('room id ' + roomId);
  //首先去除房间信息
  db.get_room_info(roomId, function (err, data) {
    if (err){
      console.log('err = ' + err);
      cb(err);
    }else {
      joinRoom(player, roomId, function (joinErr) {
        if (joinErr){
          cb(joinErr);
        }else {
          cb(null, data);
        }
      });
    }
  });
};
// exports.initRoomControl = function (db) {
//   _db = db;
// };