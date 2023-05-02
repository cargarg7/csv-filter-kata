export function compose<T>(...fns: Array<(a: T) => T>) {
	return (initialVal: T) => fns.reduceRight((prevFn, nextFn) => nextFn(prevFn), initialVal);
}
