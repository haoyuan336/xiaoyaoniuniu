import PlayerData from './player-data'
import SRequest from './../utility/simple-request'
import defines from './../defines'
const Account = function () {
    let that = {};
    that.playerData = PlayerData();


    let _callback = function (response, cb) {
        if (response.status !== 'ok') { //非正常回调
            console.error('requestData,Failed!', response.detail);
            if (cb && typeof cb == "function") {    //错误的回调
                cb(response, null);
            }
            return
        }
        if (cb && typeof cb == "function") {    //正常回调
            cb(null, response.res);
        }
    };
    let _request = function (path, queryParam, body, cb) {
        queryParam = queryParam || {};
        if (body) {
            SRequest.post(defines.gameUrl, path, queryParam, body, data=> {
                _callback(data, cb);
            });
        }
        else {
            SRequest.get(defines.gameUrl, path, queryParam, data=> {
                _callback(data, cb);
            })
        }
    };

    that.getPlayerInfo = function (uid, cb) {
        _request('/login',{uid: uid},null,cb);

    };
    that.createRoom = function (uid,data, cb) {
        _request('/createroom', {uid: uid}, data, cb);
    };
    return that;
};
export default Account;