import { DECIMAL_REGEX } from '../../../enums/decimal-regex';

export function validateDecimals(values: string[]): boolean {
	return values.every((value) => value.match(DECIMAL_REGEX));
}
