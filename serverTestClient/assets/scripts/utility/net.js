const net = function (spec) {
    let that = {};
    let sio = null;
    let ip = spec.ip;
    let isPinging = false;
    let fnDisconnect = null;
    let handlers = {};
    that.addHandler = function (event, fn) {
        if(fnDisconnect[event]){
            console.log("event:" + event + "' handler has been registered.");
            return;
        }

        var handler = function(data){
            //console.log(event + "(" + typeof(data) + "):" + (data? data.toString():"null"));
            if(event != "disconnect" && typeof(data) == "string"){
                data = JSON.parse(data);
            }
            fn(data);
        };

        handlers[event] = handler;
        if(sio){
            console.log("register:function " + event);
            sio.on(event,handler);
        }
    };
    that.connect = function (fnConnect,fnError) {
//
        var opts = {
            'reconnection':false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }
        sio = window.io.connect(ip,opts);
        sio.on('reconnect',function(){
            console.log('reconnection');
        });
        sio.on('connect',function(data){
            sio.connected = true;
            fnConnect(data);
        });

        sio.on('disconnect',function(data){
            console.log("disconnect");
            sio.connected = false;
            close();
        });

        sio.on('connect_failed',function (){
            console.log('connect_failed');
        });

        for(var key in fnDisconnect){
            var value = fnDisconnect[key];
            if(typeof(value) == "function"){
                if(key == 'disconnect'){
                    fnDisconnect = value;
                }
                else{
                    console.log("register:function " + key);
                    sio.on(key,value);
                }
            }
        }

        this.startHeartbeat();
    };
    that.startHeartbeat = function (event, data) {
        sio.on('game_pong',function(){
            console.log('game_pong');
            that.lastRecieveTime = Date.now();
        });
        that.lastRecieveTime = Date.now();
        var self = this;
        console.log(1);
        if(!self.isPinging){
            console.log(1);
            self.isPinging = true;
            setInterval(function(){
                console.log(3);
                if(sio){
                    console.log(4);
                    if(Date.now() - that.lastRecieveTime > 10000){
                        self.close();
                    }
                    else{
                        self.ping();
                    }
                }
            },5000);
        }
    };
    const send = function () {
        if(sio.connected){
            if(data != null && (typeof(data) == "object")){
                data = JSON.stringify(data);
                //console.log(data);
            }
            sio.emit(event,data);
        }
    };
    const ping = function () {
        this.send('game_ping');
    };
    that.close = function () {
        console.log('close');
        if(sio && sio.connected){
            sio.connected = false;
            sio.disconnect();
            sio = null;
        }
        if(fnDisconnect){
            fnDisconnect();
            fnDisconnect = null;
        }
    };
    return that;
};
export default net;

//
// statics: {
//     ip:"",
//         sio:null,
//         isPinging:false,
//         fnDisconnect:null,
//         handlers:{},
//     addHandler:function(event,fn){
//         if(this.handlers[event]){
//             console.log("event:" + event + "' handler has been registered.");
//             return;
//         }
//
//         var handler = function(data){
//             //console.log(event + "(" + typeof(data) + "):" + (data? data.toString():"null"));
//             if(event != "disconnect" && typeof(data) == "string"){
//                 data = JSON.parse(data);
//             }
//             fn(data);
//         };
//
//         this.handlers[event] = handler;
//         if(sio){
//             console.log("register:function " + event);
//             sio.on(event,handler);
//         }
//     },
//     connect:function(fnConnect,fnError) {
//         var self = this;
//
//         var opts = {
//             'reconnection':false,
//             'force new connection': true,
//             'transports':['websocket', 'polling']
//         }
//         sio = window.io.connect(ip,opts);
//         sio.on('reconnect',function(){
//             console.log('reconnection');
//         });
//         sio.on('connect',function(data){
//             sio.connected = true;
//             fnConnect(data);
//         });
//
//         sio.on('disconnect',function(data){
//             console.log("disconnect");
//             sio.connected = false;
//             self.close();
//         });
//
//         sio.on('connect_failed',function (){
//             console.log('connect_failed');
//         });
//
//         for(var key in this.handlers){
//             var value = this.handlers[key];
//             if(typeof(value) == "function"){
//                 if(key == 'disconnect'){
//                     fnDisconnect = value;
//                 }
//                 else{
//                     console.log("register:function " + key);
//                     sio.on(key,value);
//                 }
//             }
//         }
//
//         this.startHearbeat();
//     },
//
//     startHearbeat:function(){
//         sio.on('game_pong',function(){
//             console.log('game_pong');
//             self.lastRecieveTime = Date.now();
//         });
//         this.lastRecieveTime = Date.now();
//         var self = this;
//         console.log(1);
//         if(!self.isPinging){
//             console.log(1);
//             self.isPinging = true;
//             setInterval(function(){
//                 console.log(3);
//                 if(sio){
//                     console.log(4);
//                     if(Date.now() - self.lastRecieveTime > 10000){
//                         self.close();
//                     }
//                     else{
//                         self.ping();
//                     }
//                 }
//             },5000);
//         }
//     },
//     send:function(event,data){
//         if(sio.connected){
//             if(data != null && (typeof(data) == "object")){
//                 data = JSON.stringify(data);
//                 //console.log(data);
//             }
//             fnDisconnect.emit(event,data);
//         }
//     },
//
//     ping:function(){
//         this.send('game_ping');
//     },
//
//     close:function(){
//         console.log('close');
//         if(this.sio && this.sio.connected){
//             this.sio.connected = false;
//             this.sio.disconnect();
//             this.sio = null;
//         }
//         if(fnDisconnect){
//             fnDisconnect();
//             fnDisconnect = null;
//         }
//     },
//
//     test:function(fnResult){
//         var xhr = null;
//         var fn = function(ret){
//             fnResult(ret.isonline);
//             xhr = null;
//         }
//
//         var arr = this.ip.split(':');
//         var data = {
//             account:cc.vv.userMgr.account,
//             sign:cc.vv.userMgr.sign,
//             ip:arr[0],
//             port:arr[1],
//         }
//         xhr = cc.vv.http.sendRequest("/is_server_online",data,fn);
//         setTimeout(function(){
//             if(xhr){
//                 xhr.abort();
//                 fnResult(false);
//             }
//         },1500);
//         /*
//         var opts = {
//             'reconnection':false,
//             'force new connection': true,
//             'transports':['websocket', 'polling']
//         }
//         var self = this;
//         this.testsio = window.io.connect(this.ip,opts);
//         this.testsio.on('connect',function(){
//             console.log('connect');
//             self.testsio.close();
//             self.testsio = null;
//             fnResult(true);
//         });
//         this.testsio.on('connect_error',function(){
//             console.log('connect_failed');
//             self.testsio = null;
//             fnResult(false);
//         });
//         */
//     }
// },
