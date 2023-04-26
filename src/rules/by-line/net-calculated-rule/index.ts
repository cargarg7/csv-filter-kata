import { HEADER, SEPARATOR_CSV } from '../../../enums';
import { RuleByLineOrFalse } from '../types';
import { areEqualComparisonWithAccuracy } from './comparison.helper';

export function execute(payload: RuleByLineOrFalse): RuleByLineOrFalse {
	if (typeof payload === 'boolean') return payload;

	// Format lines
	const { header, line } = payload;
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const grossPositionByHeaders = headers.findIndex((field) => field === HEADER.IMPORT_GROSS);
	const netPositionByHeaders = headers.findIndex((field) => field === HEADER.IMPORT_NET);
	const ivaPositionByHeaders = headers.findIndex((field) => field === HEADER.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === HEADER.IGIC);

	// Sanitized Fields
	const grossFieldSanitized = parseFloat(fields[grossPositionByHeaders]);
	const netFieldSanitized = parseFloat(fields[netPositionByHeaders]);
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];
	const taxFieldSanitized = parseFloat(ivaField || igicField);

	// Calculate Net value
	const calculatedNet = grossFieldSanitized * ((100 - taxFieldSanitized) / 100);
	if (!areEqualComparisonWithAccuracy(netFieldSanitized, calculatedNet)) return false;

	return {
		header,
		line,
	};
}
