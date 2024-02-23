
declare global {
	interface String {
		toCapitalCase(): string;
		between(start: string, end: string): string;
	}

	interface Number {
		getRandom(min: number, max: number): number;
	}

	interface PromiseConstructor {
		delay(ms: number): Promise<void>;
	}
}

String.prototype.toCapitalCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.between = function (start: string, end: string) {
	return this.substring(this.indexOf(start) + start.length, this.indexOf(end));
};

Number.prototype.getRandom = function (min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Promise.delay = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));
