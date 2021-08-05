
// too many console logs makes server a bit laggy..
// turn off/on with `.debugMode [<debugLevel(0/1)>]`
//console.debug_mp = console.debug;
//console.debug = () => {};

// for even better debugging you can run this by `node --inspect main`
// then open chrome browser and go to `chrome://inspect`


require('./init_utilities')();

require('./Classes/Team').createAll();

require('./init_players')();
require('./init_network')();
require('./init_game')();


//process.on('uncaughtException', (err) => {
//	console.log(err);
//});
