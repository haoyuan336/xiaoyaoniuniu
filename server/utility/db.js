const mysql = require('mysql');
let client = undefined;
const query = function (sql, cb) {
    client.getConnection(function (err, connection) {
        if (err){
            console.log('connection mysql err = ' + err);
            throw err;
        }else {
            connection.query(sql, function (connerr, result, fileds) {
                if (connerr){
                    console.log('query err = ' + connerr);
                }else {
                    cb(result);
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
        callback(false);
    }
    var sql = 'select * from t_accounts where account ="' + account + '"';
    query(sql, function (data) {
        if (data.length !== 0){
            callback(true);
            //存在此账号
            return
        }
        callback(false);
    })
};
exports.create_account = function (userid, password, callback) {
    let sql = 'insert into t_accounts value("' + userid + '"' + ',' + '"' + password + '"' + ');';
    console.log('sql = ' + sql);
    query(sql, function (data) {
        if (callback){
            callback(true);
        }
    });
};
const value = function () {
    let str = 'value(';
    for (let i = 0 ;i < arguments.length ; i ++){
        str +=  '"' + arguments[i]  + '",'
    }
    str = str.substring(0, str.length - 1);
    str += ')';
    console.log('str = ' + str);
    return str;
};
exports.compare_acccount = function (userId,password , callback) {
    // console.log('value =  ' + value(userId, password));
    let sql = 'select * from t_accounts where account="' + userId + '";';
    query(sql, function (data) {
        data = data[0];
        if (data[userId] === password){
            console.log('用户名与密码对应');
            callback(true);
        }else {
            callback(false);
        }
    })
};