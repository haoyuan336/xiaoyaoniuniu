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
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onButtonClick: function (event ,customData) {
        switch (customData){
            case 'wxlogic':
                //微信登录
                cc.log('微信登录');
                cc.director.loadScene('mainScene');
                break;


            default:
                break;
        }
    }
});
