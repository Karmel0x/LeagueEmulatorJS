
String.prototype.toCapitalCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/**
 * 
 * @param {string} start 
 * @param {string} end 
 * @returns 
 */
String.prototype.between = function (start, end) {
	return this.substring(this.indexOf(start) + start.length, this.indexOf(end));
};

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
Number.prototype.getRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Promise.wait = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));
