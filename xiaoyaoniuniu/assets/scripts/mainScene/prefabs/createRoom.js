import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {
      gameCountChoose: {
        default: null,
        type: cc.ToggleGroup
      },
      bankerChoose: {
        default: null,
        type: cc.ToggleGroup
      },
      lockCardChoose: {
        default: null,
        type: cc.ToggleGroup
      },
      rateChoose: {
        default: null,
        type: cc.ToggleGroup
      },
      specialChoose: {
        default: null,
        type: cc.ToggleGroup
      }
    },

    // use this for initialization
    onLoad: function () {
        //加载游戏配置
       cc.loader.loadRes("config/game-config.json", (err, result)=>{
           if (err){
               console.log('err = ' + err);
           }else {
               console.log('result = ' + JSON.stringify(result));
           }
           this.gameConfig = result;
       });
    },

    onButtonClick: function (event, customData) {
        switch (customData){
            case 'close':
                this.node.destroy();
                break;
            case 'createroom':
                //创建房间

                this.createRoom();
                break;
            default:
                break;
        }
    },
  createRoom: function () {
        //创建房间
    let houseCardCast = 0;
    let gameTurnCount = 0;
    for (let i in this.gameCountChoose.toggleItems){
        let toogle = this.gameCountChoose.toggleItems[i];
        console.log('toggle is checked = ' + toogle.isChecked);
        if (toogle.isChecked){
            let name = toogle.node.name;
            let config = this.gameConfig['game_turn_count'];
            houseCardCast = config[name].houseCast;
            gameTurnCount = config[name].count;
        }
    }
    //
    cc.log('需要的房卡数是' + houseCardCast);
    cc.log('游戏的总局数' + gameTurnCount);
    // let bankerConfig = this.gameConfig['banker_rule'];
    let bankerRule  = '';
    for (let i in this.bankerChoose.toggleItems){
        let toggle = this.bankerChoose.toggleItems[i];
        if (toggle.isChecked === true){
            // bankerRule = bankerConfig[toggle.node.name];
          bankerRule = toggle.node.name;
        }
    }
    console.log('连庄规则' + bankerRule);
    //扣牌规则
    let lockRule = "";
    // let lockConfig = this.gameConfig['lock_card'];
    for (let i in this.lockCardChoose.toggleItems){
        let toggle = this.lockCardChoose.toggleItems[i];
        if (toggle.isChecked){
            // lockRule = lockConfig[toggle.node.name];
          lockRule = toggle.node.name;
        }

    }
    let rateCount = "";
    // let rateConfig = this.gameConfig['rate_count'];
    for (let i in this.rateChoose.toggleItems){
        let toggle = this.rateChoose.toggleItems[i];
        if (toggle.isChecked){
            // rateCount = rateConfig[toggle.node.name];
            rateCount = toggle.node.name;
        }
    }
    cc.log('rate count = ' + rateCount);

    let specialChoose = "";
    // let specialConfig = this.gameConfig["special_card"];
    for (let i in this.specialChoose.toggleItems){
        let toggle = this.specialChoose.toggleItems[i];
        if (toggle.isChecked){
            // specialChoose = specialConfig[toggle.node.name];
          specialChoose = toggle.node.name;
        }
    }
    cc.log('special card = ' + specialChoose);
    global.account.createRoom(global.account.playerData.playerUid,
      {
        houseCardCount: houseCardCast,
        roundCount: gameTurnCount,
        lockRule: lockRule,
        rateRule: rateCount,
        specialType: specialChoose,
        bankerRule: bankerRule
      }, (err, data)=>{
        if (err){
          cc.log('err = ' + err);
          return;
        }
        //创建房间成功，
        console.log('创建房间成功' + JSON.stringify(data));
        // global.event.fire('enter_room',)
        global.account.playerData.roomId = data.roomId;
        global.event.fire('enter_room');

        //进入房间
      });
  }
});
