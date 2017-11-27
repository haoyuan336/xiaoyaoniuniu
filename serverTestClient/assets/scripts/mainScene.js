import global from './global'
// var agent = anysdk.agentManager;
// var user_plugin = agent.getUserPlugin();
cc.Class({
    extends: cc.Component,

    properties: {
        wxLoginButton: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        if (cc.sys.isMobile){
            this.agent = anysdk.agentManager;
            this.userPlugins = this.agent.getUserPlugin();
            this.userPlugins.setListener(function (code, msg) {
                switch (code){
                    case anysdk.UserActionResultCode.kInitSuccess:
                        cc.log('anysdk 初始化成功 ');
                        break;
                    case anysdk.UserActionResultCode.kInitFail:
                        cc.log('anysdk 初始化失败 ');
                        break;
                    case anysdk.UserActionResultCode.kLoginSuccess:
                        cc.log("登陆成功");
                        break;
                    case anysdk.UserActionResultCode.kLoginCancel:
                        cc.log("登陆取消");
                        break;
                    case anysdk.UserActionResultCode.kLoginFail:
                        cc.log("登陆失败" + msg);
                        break;
                    default:
                        break;
                }
            })
        }


    },
    update: function (dt) {


    },
    onButtonClick: function (event,customData) {
        switch (customData){
            case 'wxLogin':
                console.log('wx 登陆');

                this.userPlugins.login({
                    key1: 'value1',
                    key2: 'valye2'
                });
                break;
            default:
                break;
        }
    }
});
