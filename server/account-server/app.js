const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const roomManager = require('./game/roomManager');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/login', function (req, res) {
    res.send({
        status: 'ok',
        res: 'hello world'
    });
});
app.post('/createroom', function (req, res) {
    let gameTurnCounr = req.body.gameTurnCount;
    let houseCardCast = req.body.houseCardCast;

    roomManager.createRoom(req.body, function () {
        //创建房间的工作 交给房间管理器
        res.send({
            'status': 'ok',
            res: 'create success'
        });
    });


   //创建房间成功
});
app.joinRoom('/joinRoom', function () {

});
var server = app.listen(3000, function () {
    let ip = server.address().address;
    let port = server.address().port;
    console.log('express listener on' + ip + ':' + port);
});