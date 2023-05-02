import { RulesInput } from '../common/types/rules-decorator';
import { NET_CALCULATED_RULE_FIELDS } from './net-calculated-fields';
import { IS_VALID_RULE_VALIDATE } from '../common/enums/is-valid-rule-validate';
import { validateDecimals } from '../common/helpers/validate-decimals';
import { areEqualComparisonWithAccuracy } from './are-equal-comparison-with-accuracy';

export function isValid({ headers, fields }: RulesInput): boolean {
	// Find Position Index by Headers fields
	const grossPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.GROSS);
	const netPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.NET);
	const ivaPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === NET_CALCULATED_RULE_FIELDS.IGIC);

	// Get Fields in line by Index
	const grossField = fields[grossPositionByHeaders];
	const netField = fields[netPositionByHeaders];
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];
	const taxField = ivaField || igicField;

	// 1. ValidatateDecimals Validation Rule
	if (!validateDecimals([grossField, netField, taxField])) return IS_VALID_RULE_VALIDATE.FALSE;

	// Sanitize Values
	const grossFieldSanitized = parseFloat(grossField);
	const netFieldSanitized = parseFloat(netField);
	const taxFieldSanitized = parseFloat(taxField);

	// 2. Calculate Net value Validation Rule
	const calculatedNet = grossFieldSanitized * ((100 - taxFieldSanitized) / 100);
	return areEqualComparisonWithAccuracy(netFieldSanitized, calculatedNet);
}
