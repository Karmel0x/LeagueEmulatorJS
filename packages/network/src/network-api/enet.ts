
import { EnetSocketUsingEvents } from '../../../enetcppjs/src/enet-using-events';
import type { NetworkApi } from './network-api';


class NetworkApiEnet extends EnetSocketUsingEvents implements NetworkApi { }
export default NetworkApiEnet;
