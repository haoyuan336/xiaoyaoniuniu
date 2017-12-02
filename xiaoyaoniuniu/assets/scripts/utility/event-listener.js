const EventListener = function (obj) {
  let Register = {};
  obj.on = function (type, method) {
    if (!Register.hasOwnProperty(type)){
      Register[type] = [method];
    }else {
      Register[type].push(method);
    }
  };
  obj.fire = function (type) {
    console.log('fire type = ' + type);
    if (Register.hasOwnProperty(type)){
      console.log('have handler');

      let handlerList = Register[type];
      for (let i = 0 ; i < handlerList.length ; i ++){
        let handler = handlerList[i];
        let args = [];
        for (let j = 1 ; j < arguments.length ; j ++){
          args.push(arguments[j]);
        }
        handler(args);
      }
    }else {
      console.log('regishter no have '+ type);
    }
  };
  obj.removeListener = function (type, method) {
    if (!Register.hasOwnProperty(type)){
      return;
    }
    let handlerList = Register[type];
    for (let i = handlerList.length - 1 ; i >= 0 ; i --){
      if (handlerList[i] === method){
        handlerList.splice(i , 1);
      }
    }
    console.log('删除时间');
  };
  obj.removeAllListeners = function () {

    Register = {};
  }
  return obj;
};
export default EventListener;