import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },

    onButtonClick: function (event, customData) {
        switch (customData){
            case 'close':
                this.node.destroy();
                break;
            case 'createroom':
                //创建房间
                global.account.createRoom(global.account.playerData.playerUid,
                    {
                        gameTurnCount: 1,
                        houseCardCast: 10

                    }, (err, data)=>{
                        if (err){
                            cc.log('err = ' + err);
                            return;
                        }
                        //创建房间成功，
                        console.log('创建房间成功' + data);
                        this.node.destroy();
                    })

                break;
            default:
                break;
        }
    }
});
