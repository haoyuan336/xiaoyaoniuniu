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
    let userId = req.body.userid;
    let password = req.body.password;
    db.compare_acccount(userId, password, function (data) {
        res.send({
            status: 'ok',
            res: data
        });

    });
});
app.post('/create_account', function (req, res) {
   //创建用户
    let uid = req.body.userid;
    let passworld = req.body.password;

    db.create_account(uid, passworld, function (result) {
        if (result){
            console.log('创建账号成功');
            res.send({
                status: 'ok',
                res: result
            })
        }else {
            res.send({
                status: 'fail',
                res: 'create account fail'
            })
        }
    });
});
app.get('/get_player_info', function (req, res) {
    let uid = res.query.uid;
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

});



var server = app.listen(3000, function () {
    let ip = server.address().address;
    let port = server.address().port;
    console.log('express listener on' + ip + ':' + port);
});