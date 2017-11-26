cc.Class({
    extends: cc.Component,

    properties: {
        roomIdLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.str = '';
    },


    onButtonClick: function (event, customData) {
        if (parseInt(customData) >=0 && parseInt(customData) <= 9){
            this.str += customData;
        }

        switch (customData){
            case 'clear':
                this.str = '';
                break;
            case 'back':
                this.str = this.str.substring(0, this.str.length - 1);
                break;
            case 'close':
                this.node.destroy();
            default:
                break;
        }
        if (this.str.length > 6){
            this.str = this.str.substring(0,6);
        }
        this.referUI();
    },
    referUI: function () {
        let str = '';
        for (let i = 0 ; i < this.str.length ; i ++){
            str += this.str[i] + '    ';
        }
        this.roomIdLabel.string = str;
    }
});
