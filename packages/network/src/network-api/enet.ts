
import { NetworkApi } from './network-api';
import { EnetSocketUsingEvents } from '../../../enetcppjs/src/enet-using-events';


class NetworkApiEnet extends EnetSocketUsingEvents implements NetworkApi { }
export default NetworkApiEnet;
