import { RulesInput } from '../types';
import { NET_CALCULATED_RULE_FIELDS } from './enums';
import { areEqualComparisonWithAccuracy } from './comparison.helper';

export function execute({ headers, fields }: RulesInput): boolean {
	// Position Index by Headers
	const grossPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.GROSS);
	const netPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.NET);
	const ivaPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IGIC);

	// Sanitized Fields
	const grossFieldSanitized = parseFloat(fields[grossPositionByHeaders]);
	const netFieldSanitized = parseFloat(fields[netPositionByHeaders]);
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];
	const taxFieldSanitized = parseFloat(ivaField || igicField);

	// Calculate Net value
	const calculatedNet = grossFieldSanitized * ((100 - taxFieldSanitized) / 100);
	return !areEqualComparisonWithAccuracy(netFieldSanitized, calculatedNet);
}
