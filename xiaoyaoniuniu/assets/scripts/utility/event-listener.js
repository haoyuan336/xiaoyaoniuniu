const EventListener = function (obj) {
  let Register = {};
  obj.on = function (type, method) {
    if (Register.hasOwnProperty(type)){
      Register[type] = [method];
    }else {
      Register[type].push(method);
    }
  };
  obj.fire = function (type) {
    if (Register.hasOwnProperty(type){
      
    }
  };
  return obj;
};
export default EventListener;