const mysql = require('mysql');
let client = undefined;
const query = function (sql, cb) {
    console.log('query = ' + sql);
    client.getConnection(function (err, connection) {
        if (err){
            console.log('connection mysql err = ' + err);
            cb(err);
            throw err;
        }else {
            connection.query(sql, function (connerr, result, fileds) {
                if (connerr){
                    console.log('query err = ' + connerr);
                    cb(connerr);
                }else {
                    cb(null,result);
                }
                connection.release();
            })
        }
    })
};
exports.connect = function (config) {
    client = mysql.createPool({
        user: config.user,
        password: config.pswd,
        database: config.db
    });
};

exports.is_account_exist = function (account, callback) {
    // callback = callback == null? nop: callback;
    console.log('检查是否存在账号');
    if (account == null){
        callback(null,false);
    }
    var sql = 'select * from t_accounts where account ="' + account + '"';
    query(sql, function (err, data) {
        if (err){
            callback(err);
        }else {
            if (data.length !== 0){
                callback(null, true);
                //存在此账号
                return
            }
            callback(null,false);
        }

    })
};
exports.create_account = function (userid, password, callback) {
    let sql = 'insert into t_accounts value("' + userid + '"' + ',' + '"' + password + '"' + ');';
    console.log('sql = ' + sql);
    query(sql, function (err, data) {
        if (err){
            callback(err);
        }else {
            callback(null, true);
        }

    });
};
const value = function () {
    let str = 'value(';
    for (let i = 0 ;i < arguments.length ; i ++){
        if (typeof arguments[i] === 'string'){
          str +=  '"' + arguments[i]  + '",'
        }else {
          str += arguments[i] + ','
        }

    }
    str = str.substring(0, str.length - 1);
    str += ')';
    console.log('str = ' + str);
    return str;
};
exports.compare_acccount = function (userId,password , callback) {
    // console.log('value =  ' + value(userId, password));
    let sql = 'select * from t_accounts where account="' + userId + '";';
    query(sql, function (err, data) {

        if (err){
            callback(err);
        }else {
            let uid = data[0];
            if (data[0]['password'] === password){
                callback(null,true);
            }else {
                callback(null,false);
            }
        }
    })
};
exports.get_player_info = function (uid, cb) {
    let sql = 'select * from t_userinfo where account="' + uid + '";';
    query(sql, function (err, data) {
        if (err){
            console.log('get player info err = ' + err);
        }else {
            console.log('data =' + JSON.stringify(data));
            if (data.length === 0){
                cb('is not exist user' + uid);

            }else {
                cb(null, data[0]);
            }
        }

    })
};
exports.is_vip_account = function (uid, cb) {
  let sql = 'select * from t_vip_account where account = ' + uid + ';';
  console.log('sql = ' + sql);
  query(sql, function (err,data) {
      if (data.length === 0){
          cb(false);
      }else {
          cb(true);
      }
  })
};
exports.create_room = function (data, cb) {
    let sql = 'insert into t_roominfo ' + value(
      data.housemaster,
      data.roomid,
      data.houseCardCount,
      data.roundCount,
      data.lockRule,
      data.rateRule,
      data.specialType,
      data.bankerRule
    ) + ';';
    query(sql, function (err, data) {
        if (err){
            console.log('err = ' + err);
            throw err;
        }else {
            console.log('create room = ' + JSON.stringify(data));
            if(cb){
                cb(null,'创建成功');
            }
        }
    });
};
exports.get_room_info = function (roomId,cb) {
    let sql = 'select * from t_roominfo where roomid = ' + roomId;
    query(sql, function (err, data) {
      if (err){
          console.log('err' + err);
          cb(err);
      }else {
          //返回数组的列表里面的第一个元素
          cb(null, data[0]);
      }
    })
};