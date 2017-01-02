import chaiAsPromised  from "chai-as-promised";
import dirtyChai  from "dirty-chai"
window.jsdom = Function.prototype;

chai.use(chaiAsPromised);
chai.use(dirtyChai);
