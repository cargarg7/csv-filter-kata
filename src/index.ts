import { rules } from './rules';

export function parseCSV(header?: string, lines?: string[]) {
	if (!header) throw new Error('Header must not be empty');
	if (!lines?.length) return { header, lines: [] };

	// Rules
	const linesSanitized = lines.filter((line) => rules({ header, line, lines, status: true }).status);

	return {
		header,
		lines: linesSanitized,
	};
}
