
import { EnetSocketUsingEvents } from '../../../enetcppjs/src/enet-using-events';
import { NetworkApi } from './network-api';


class NetworkApiEnet extends EnetSocketUsingEvents implements NetworkApi { }
export default NetworkApiEnet;
