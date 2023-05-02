import { RulesCallback, ContinueOrFalse } from '../types/rules-decorator';
import { SEPARATOR_CSV } from '../../../enums/separator-csv';
import { LINE_SHOULD_BE_PROCESSED } from '../enums/line-should-be-processed';

export function isValidRuleOrNext(isValidRule: RulesCallback) {
	return (payload: ContinueOrFalse): ContinueOrFalse => {
		if (payload === false) return LINE_SHOULD_BE_PROCESSED.FALSE;

		// Formatting lines
		const { header, line, lines } = payload;
		const headers = header.split(SEPARATOR_CSV);
		const fields = line.split(SEPARATOR_CSV);

		return isValidRule({ headers, fields, lines }) ? payload : LINE_SHOULD_BE_PROCESSED.FALSE;
	};
}
