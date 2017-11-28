const express = require("express");
const app = express();
// HOST:'localhost',
// USER:'root',
// PSWD:'chu7758521',
// DB:'nodejs',
// PORT:3306,
const config = {
    HOST:'localhost',
    USER:'root',
    PSWD:'chu7758521',
    DB:'nodejs',
    PORT:3307
}
const Message = function(status,res){
    let that = {
        status: status,
        res: res
    };
    return that;
}


app.listen(config.PORT);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get("/login",function(req, res){ 
    
    res.send(Message('ok', 'hello world'));
})