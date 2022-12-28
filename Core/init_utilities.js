
String.prototype.toCapitalCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

Number.prototype.getRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.between = function (start, end) {
	return this.substring(this.indexOf(start) + start.length, this.indexOf(end));
};

Promise.wait = (ms) => new Promise(resolve => setTimeout(() => resolve(null), ms));


module.exports = () => { };
