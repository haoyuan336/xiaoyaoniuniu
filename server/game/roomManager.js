let rooms = {};

const getRandomRoomId = function (cb) {
    let id = '';
    for (let i = 0 ; i < 6 ; i ++){
        id += Math.floor(Math.random() * 10);
    }
    if (rooms.hasOwnProperty(id)){
        getRandomRoomId(cd);
    }else {
        cb(id);
    }

}
exports.createRoom = function (data, cb) {
    console.log('create room = ' + JSON.stringify(data));
    getRandomRoomId(function (roomId) {
        console.log('new room id =  ' + roomId);
    });
}