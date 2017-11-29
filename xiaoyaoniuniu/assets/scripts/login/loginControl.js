import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
       loadingAnimatePre: {
           default: null,
           type: cc.Prefab
       }
    },

    // use this for initialization
    onLoad: function () {
        this.loadingAnimate = cc.instantiate(this.loadingAnimatePre);
        this.loadingAnimate.parent = this.node;
        setTimeout( ()=> {
            this.loadingAnimate.destroy();
        },1000)



      if (cc.sys.isMobile){
        this.userPlugin = anysdk.agentManager.getUserPlugin();
        this.userPlugin.setListener(this.onUserResult.bind(this), this);
      }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onButtonClick: function (event ,customData) {
        switch (customData){
            case 'wxlogic':
                //微信登录
                cc.log('微信登录');
                // cc.director.loadScene('mainScene');
                // global.account.getPlayerInfo(global.account.playerData.playerUid,(err, data)=>{
                //     if (err){
                //         cc.log('err = ' + err);
                //         return;
                //     }
                //     cc.log('登录成功' + data);
                //     cc.director.loadScene('mainScene');
                // });
                // global.account.login(global.account.playerData.playerUid,
                //     global.account.playerData.auth, function (data) {
                //        if (data === true){
                //            console.log('登录成功');
                //            cc.director.loadScene('mainScene');
                //        }
                //     })


                this.userPlugin.login({});
                break;


            default:
                break;
        }
    },
    onUserResult: function (code, msg) {
        cc.log('on user result action' + code);
        cc.log('msg =' + msg);
        switch (code){
          case anysdk.UserActionResultCode.kLoginSuccess:
              cc.log("登陆成功");
              break;
          case anysdk.UserActionResultCode.kLoginFail:
              cc.log('登陆失败');
              break;
        }
    }
});
