export function compose(...fns) {
	return (initialVal) => fns.reduceRight((val, fn) => fn(val), initialVal);
}
