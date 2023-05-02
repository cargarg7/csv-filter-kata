import { RulesInput } from '../common/types/rules-decorator';
import { TAX_RULE_FIELDS } from './tax-fields';
import { validateDecimals } from '../common/helpers/validate-decimals';

export function isValid({ headers, fields }: RulesInput): boolean {
	// Find Position Index by Headers fields
	const ivaPositionByHeaders = headers.findIndex((field) => field === TAX_RULE_FIELDS.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === TAX_RULE_FIELDS.IGIC);

	// Get Fields in line by Index
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];

	// Tax Validation Rule
	return !(ivaField && igicField) && validateDecimals([ivaField || igicField]);
}
