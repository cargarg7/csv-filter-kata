import { rules } from './rules/rules';

export function parseCSV(header?: string, lines?: string[]) {
	if (!header) throw new Error('Header must not be empty');
	if (!lines?.length) return { header, lines: [] };

	// Rules
	const linesFiltered = lines?.filter((line: string) => !!rules({ header, line, lines }));
	console.log('linesFiltered', linesFiltered);
	return {
		header,
		lines: linesFiltered,
	};
}
