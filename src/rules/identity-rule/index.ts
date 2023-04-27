import { RulesInput } from '../types';
import { IDENTITY_RULE_FIELDS } from './enums';

export function execute({ headers, fields }: RulesInput): boolean {
	// Position Index by Headers
	const cifPositionByHeaders = headers.findIndex((field) => field === IDENTITY_RULE_FIELDS.CIF);
	const nifPositionByHeaders = headers.findIndex((field) => field === IDENTITY_RULE_FIELDS.NIF);

	// Sanitized Fields
	const cifField = fields[cifPositionByHeaders];
	const nifField = fields[nifPositionByHeaders];

	// Rule
	return !!(cifField && nifField);
}
