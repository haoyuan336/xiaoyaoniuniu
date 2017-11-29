const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require(process.argv[2]);
const mysqlConfig = config.mysql();
const db = require('./../utility/db');
db.connect(mysqlConfig);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// db.is_vip_account('10000', function (result) {
//     console.log('result' + result);
//     //这个是vip账号
// });
app.post('/login', function (req, res) {
    let userId = req.body.uid;
    let password = req.body.password;
    console.log('uid = ' + userId);
    console.log('password' + password);
    db.compare_acccount(userId, password, function (err, data) {

        console.log('返回成功' + JSON.stringify(data));
        if (err){
            console.log('err = ' + err);
            res.send({
                status: 'ok',
                res: err
            });
        }else {
            res.send({
                status: 'ok',
                res: data
            })
        }


    });
});
// app.post('/', function (req, res) {
//    //创建用户
//     console.log('创建用户的借口');
//     let uid = req.body.uid;
//     let passworld = req.body.password;
//
//     db.create_account(uid, passworld, function (result) {
//         if (result){
//             console.log('创建账号成功');
//             res.send({
//                 status: 'ok',
//                 res: result
//             })
//         }else {
//             res.send({
//                 status: 'fail',
//                 res: 'create account fail'
//             })
//         }
//     });
// });
app.get('/get_player_info', function (req, res) {
    let uid = req.query.uid;
    console.log('uid = ' + uid);
    db.get_player_info(uid, function (err, data) {
        if (err){
            res.send({
                status: 'fail',
                err: err
            });
        }else {
            res.send({
                status: 'ok',
                res: data
            });
        }

    });
});
app.post('/create_room', function (req, res) {
    let uid = req.query.uid;
    let roomData = req.body;
    console.log('create room id = ' + uid);
    console.log('room data = ' + JSON.stringify(roomData));
    //首先取出这个玩家的房卡的个数
    if (roomData === undefined){
        res.send({
            status: 'fail',
            data: 'require house data'
        })
        return
    }
    let data = {
        houseCardCount: roomData.houseCardCount,
        roundCount: roomData.roundCount,
        bankerRule: roomData.bankerRule,
        rateRule: roomData.rateRule,
        specialType: roomData.specialType,
        lockRule: roomData.lockRule
    }
    for (let i in data){
        if (data[i] === undefined){
            res.send({
              status: "fail",
              res: 'require ' + i
            });
            return;
        }
    }
    console.log('参数齐全了');
  res.send({
    status: 'ok',
    res: '创建房间成功'
  });
});



var server = app.listen(3000, function () {
    let ip = server.address().address;
    let port = server.address().port;
    console.log('express listener on' + ip + ':' + port);
});