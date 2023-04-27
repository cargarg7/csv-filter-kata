import { RulesInput } from '../types';
import { TAX_RULE_FIELDS } from './enums';

export function execute({ headers, fields }: RulesInput): boolean {
	// Position Index by Headers
	const ivaPositionByHeaders = headers.findIndex((field) => field === TAX_RULE_FIELDS.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === TAX_RULE_FIELDS.IGIC);

	// Sanitized Fields
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];

	// Rule
	return !!(ivaField && igicField);
}
