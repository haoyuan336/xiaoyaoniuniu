import global from './../global'

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //    default: null,      // The default value will be used only when the component attaching
    //                           to a node for the first time
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    houseIdLabel: {
      default: null,
      type: cc.Label
    },
    houseCountLabel: {
      default: null,
      type: cc.Label
    },
    bankerRuleLabel: {
      default: null,
      type: cc.Label
    },
    lockRuleLabel: {
      default: null,
      type: cc.Label
    },
    specialLabel: {
      default: null,
      type: cc.Label
    },
    rateLabel: {
      default: null,
      type: cc.Label
    }
  },

  // use this for initialization
  onLoad: function () {
    global.event.on('enter_room_success', this.enterRoomSuccess.bind(this));
    cc.loader.loadRes('/config/game-config', function (err, result) {
      if (err) {
        console.log('err = ' + err);
      } else {
        this.gameConfig = result;
      }
    }.bind(this));
    cc.loader.loadRes('/config/other-config', function (err, result) {
      if (err){
        console.log('err = ' + err);
      }else {
        this.nameConfig = result.name_config;
        console.log('name config ' + JSON.stringify(this.nameConfig));

      }
    }.bind(this));
  },
  enterRoomSuccess: function (data) {
    for (let  i in data){
      console.log('i = ' + i + ":" + JSON.stringify(data[i]));
    }
    // console.log('enter room success = ' + JSON.stringify(data));
    this.houseIdLabel.string = data.roomid;
    this.houseCountLabel.string = data.roundcount + '局';
    // console.log('banker rule = ')
    this.bankerRuleLabel.string = this.nameConfig[data.bankerrule];
    this.lockRuleLabel.string = this.nameConfig[data.lockrule];
    let specialRule = this.gameConfig['special_card'][data.specicaltype];
    console.log('specail rule  = ' + JSON.stringify(specialRule));
    let specialStr = '';
    for (let i in specialRule){
      console.log('i = ' + i);
      let name = this.nameConfig[i];
      console.log('name = ' + name);
      specialStr += this.nameConfig[i] + 'X' + specialRule[i];
    }
    console.log('special str = ' + specialStr);
    this.specialLabel.string = specialStr;


    let rateRuleStr = '';
    let rateRule = this.gameConfig['rate_count'][data.raterule];
    console.log('rate rule = ' + JSON.stringify(rateRule));
    for (let i in rateRule){
      rateRuleStr +=  this.nameConfig[i] + 'X' + rateRule[i];
    }
    this.rateLabel.string = rateRuleStr;
    // this.rateLabel.string = this.nameConfig[data.raterule];

    // this.bankerRuleLabel.string = data.bankerrule;
    // this.specialLabel.string = data.specicaltype;
    // this.rateLabel.string = data.raterule;

  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
