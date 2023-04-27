import { RulesInput } from '../types';
import { NET_CALCULATED_RULE_FIELDS } from './enums';
import { areEqualComparisonWithAccuracy } from './comparison.helper';
import { RULE_VALIDATE_HAS_ERROR } from '../enums';
import { validateDecimals } from '../helpers/validate-decimals';

export function invalid({ headers, fields }: RulesInput): boolean {
	// Position Index by Headers
	const grossPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.GROSS);
	const netPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.NET);
	const ivaPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IGIC);

	// Get Fields
	const grossField = fields[grossPositionByHeaders];
	const netField = fields[netPositionByHeaders];
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];
	const taxField = ivaField || igicField;
	if (!validateDecimals([grossField, netField, taxField])) return RULE_VALIDATE_HAS_ERROR.TRUE;

	// Sanitized Fields
	const grossFieldSanitized = parseFloat(grossField);
	const netFieldSanitized = parseFloat(netField);
	const taxFieldSanitized = parseFloat(taxField);

	// Calculate Net value
	const calculatedNet = grossFieldSanitized * ((100 - taxFieldSanitized) / 100);
	return !areEqualComparisonWithAccuracy(netFieldSanitized, calculatedNet);
}
