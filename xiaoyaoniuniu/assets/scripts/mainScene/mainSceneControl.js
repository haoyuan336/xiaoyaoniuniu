cc.Class({
    extends: cc.Component,

    properties: {
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
        }
    },

    // use this for initialization
    onLoad: function () {

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
                break;
            default:
                break
        }
    }
});
