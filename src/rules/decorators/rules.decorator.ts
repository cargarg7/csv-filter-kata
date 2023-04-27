import { SEPARATOR_CSV } from '../../enums';
import { RulesCallback, RulesOrInvalid } from '../types';
import { LINE_SHOULD_BE_PROCESSED } from '../enums';

export function ruleDecorator(hasErrorValidateRule: RulesCallback) {
	return (payload: RulesOrInvalid): RulesOrInvalid => {
		if (typeof payload === 'boolean') return LINE_SHOULD_BE_PROCESSED.FALSE;

		// Formatting lines
		const { header, line, lines } = payload;
		const headers = header.split(SEPARATOR_CSV);
		const fields = line.split(SEPARATOR_CSV);

		return hasErrorValidateRule({ headers, fields, lines }) ? LINE_SHOULD_BE_PROCESSED.FALSE : payload;
	};
}
