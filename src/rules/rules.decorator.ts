import { SEPARATOR_CSV } from '../enums';
import { RulesCallback, RulesOrFalse } from './types';
import { RULES_VALIDATE } from './enums';

export function ruleDecorator(fn: RulesCallback) {
	return (payload: RulesOrFalse): RulesOrFalse => {
		if (typeof payload === 'boolean') return RULES_VALIDATE.FALSE;

		// Formatting lines
		const { header, line, lines } = payload;
		const headers = header.split(SEPARATOR_CSV);
		const fields = line.split(SEPARATOR_CSV);

		return fn({ headers, fields, lines }) ? RULES_VALIDATE.FALSE : payload;
	};
}
