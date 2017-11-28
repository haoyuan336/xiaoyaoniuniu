const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require(process.argv[2]);
const mysqlConfig = config.mysql();
const bd = require('./../utility/db');
bd.connect(mysqlConfig);
bd.is_account_exist('10000', function (value) {
    if (value){
        console.log('账号存在');
    }else {
        console.log('不存在的账号');
    }
});
bd.create_account('30000', '30000', function (result) {
    if (result){
        console.log('创建账号成功');
    }else {
        console.log('创建账号失败');
    }
});
bd.compare_acccount('30000', '30000', function (data) {
    console.log('data = ' + data);
    if (data){
        console.log('验证成功');
    }
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('hello world');
});
app.post('/login', function (req, res) {
    // res.send({
    //     status: 'ok',
    //     res: 'hello world'
    // });

    let userId = req.body.userid;
    let password = req.body.password;
    bd.compare_acccount(userId, password, function (data) {
        if (data){
            console.log('验证成功');
        }
    });
});
app.post('/create_account', function (req, res) {
   //创建用户
});
var server = app.listen(3000, function () {
    let ip = server.address().address;
    let port = server.address().port;
    console.log('express listener on' + ip + ':' + port);
});