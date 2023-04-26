import { rulesByLine, rulesByLines } from './rules/rules';

export function parseCSV(header?: string, lines?: string[]) {
	if (!header) throw new Error('Header must not be empty');
	if (!lines?.length) return { header, lines: [] };

	// Rules
	const linesFilteredByLines = rulesByLines(header)(lines);
	const linesFilteredByLine = linesFilteredByLines?.lines?.filter((line: string) => !!rulesByLine(header)(line));

	return {
		header,
		lines: linesFilteredByLine,
	};
}
