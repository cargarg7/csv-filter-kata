import { HEADER, SEPARATOR_CSV } from '../../enums';
import { RulesOrFalse } from '../types';

export function execute(payload: RulesOrFalse): RulesOrFalse {
	if (typeof payload === 'boolean') return payload;

	// Format lines
	const { header, line } = payload;
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const cifPositionByHeaders = headers.findIndex((field) => field === HEADER.CIF);
	const nifPositionByHeaders = headers.findIndex((field) => field === HEADER.NIF);

	// Sanitized Fields
	const cifField = fields[cifPositionByHeaders];
	const nifField = fields[nifPositionByHeaders];

	// Rule
	if (cifField && nifField) return false;

	return payload;
}
