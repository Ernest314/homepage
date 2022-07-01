// Bounds: [min, max)
export function random_int(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	const range = max - min;
	return Math.floor(Math.random() * range + min);
}

// Async delay (chainable).
export function delay(msec: number) {
	return new Promise(resolve => setTimeout(resolve, msec));
}
