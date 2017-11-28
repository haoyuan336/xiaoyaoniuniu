import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        houseCardCountLabel: {
            default: null,
            type: cc.Label
        },
        nicknameLabel: {
            default: null,
            type: cc.Label
        },
        headImage: {
            default: null,
            type: cc.Sprite
        },
        uidLabel: {
            default: null,
            type: cc.Label
        },
        gameIntroductionPrefab: {
            default: null,
            type: cc.Prefab
        },
        fightRecordPrefab: {
            default: null,
            type: cc.Prefab
        },
        createRoomPrefab: {
            default: null,
            type: cc.Prefab
        },
        joinRoomPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

        //进入游戏主界面的时候 ，访问服务器接口 获取一些数据
        this.uidLabel.string = global.account.playerData.playerUid + '';
        global.account.getPlayerInfo(global.account.playerData.playerUid, function (err, data) {
            if (err){
                console.log('err = ' + err);
            }else {
                console.log('data = ' + JSON.stringify(data));
                global.account.playerData.nickname = data.nickname;
                global.account.playerData.headimage = data.headimage;
                global.account.playerData.housecard = data.housecard;
                this.nicknameLabel.string = data.nickname;
                cc.loader.load(data.headimage ,(error, spriteFrame)=> {
                    if (error){
                        console.log('err = ' + error);
                    }else {
                        console.log('下载成功');
                    }
                    this.headImage.spriteFrame.setTexture(spriteFrame);
                });

            }
        }.bind(this));

        
    },

    onButtonClick: function (event,customData) {
        switch (customData){
            case 'wanfa':
                //打开玩法界面
                cc.log("打开玩家界面");
                let gameIntroductionNode = cc.instantiate(this.gameIntroductionPrefab);
                gameIntroductionNode.parent = this.node;
                break;
            case 'fightrecord':
                let figheRecord = cc.instantiate(this.fightRecordPrefab);
                figheRecord.parent = this.node;
                break;
            case 'createRoom':
                let createRoom = cc.instantiate(this.createRoomPrefab);
                createRoom.parent = this.node;
                break;
            case 'joinRoom':
                let joinRoom = cc.instantiate(this.joinRoomPrefab);
                joinRoom.parent = this.node;
                break;
            default:
                break
        }
    },
    update: function (dt) {
        this.houseCardCountLabel.string = global.account.playerData.housecard + '';
    }
});
