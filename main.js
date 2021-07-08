

require('./init_utilities')();

require('./Classes/Team').createAll();

require('./init_players')();
require('./init_network')();
require('./init_game')();


//process.on('uncaughtException', function (err) {
//	console.log(err);
//	console.log(err.stack);
//});
