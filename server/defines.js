exports.mysql =function (){
    return {
        host: 'localhost',
        user: 'root',
        pswd: 'chu7758521',
        db: 'mydb',
        port: 3000
    }
};
exports.accountServer = function () {
    return {
        host: 'localhost',
        port: 3000
    }
};
exports.gameServer = function () {
    return {
        host: 'localhost',
        port: 3002
    }
};
