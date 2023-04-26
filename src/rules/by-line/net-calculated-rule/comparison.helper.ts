export function areEqualComparisonWithAccuracy(number1: number, number2: number): boolean {
	return Math.abs(number1 - number2) < Number.EPSILON;
}
