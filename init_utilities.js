
String.prototype.toCapitalCase = function(){
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

function init_utilities(){
    global.Utilities = {};
    global.Utilities.wait = (ms) => new Promise(resolve => setTimeout(() => resolve(null), ms));

}

module.exports = init_utilities;
