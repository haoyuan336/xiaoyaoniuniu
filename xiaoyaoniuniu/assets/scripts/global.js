import Account from './data/account'
import EventListener from './utility/event-listener'
const global = {};
global.account = Account();
global.event = EventListener({});
export default  global;