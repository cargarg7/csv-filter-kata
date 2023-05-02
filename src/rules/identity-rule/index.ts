import { RulesInput } from '../common/types/rules-decorator';
import { IDENTITY_RULE_FIELDS } from './identity-fields';

export function isValid({ headers, fields }: RulesInput): boolean {
	// Find Position Index by Headers fields
	const cifPositionByHeaders = headers.findIndex((field) => field === IDENTITY_RULE_FIELDS.CIF);
	const nifPositionByHeaders = headers.findIndex((field) => field === IDENTITY_RULE_FIELDS.NIF);

	// Get Fields in line by Index
	const cifField = fields[cifPositionByHeaders];
	const nifField = fields[nifPositionByHeaders];

	// Validation Rule
	return !(cifField && nifField);
}
