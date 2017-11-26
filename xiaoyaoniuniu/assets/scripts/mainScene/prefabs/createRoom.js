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
            default:
                break;
        }
    }
});
