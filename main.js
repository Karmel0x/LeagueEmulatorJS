var init_network = require('./init_network');
var init_players = require('./init_players');


init_network();
global.Players = init_players();


//process.on('uncaughtException', function (err) {
//	console.log(err);
//	console.log(err.stack);
//});
