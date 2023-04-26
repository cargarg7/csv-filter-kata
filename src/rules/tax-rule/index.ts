import { HEADER, SEPARATOR_CSV } from '../../enums';
import { RulesOrFalse } from '../types';

export function execute(payload: RulesOrFalse): RulesOrFalse {
	if (typeof payload === 'boolean') return payload;

	// Format lines
	const { header, line } = payload;
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const ivaPositionByHeaders = headers.findIndex((field) => field === HEADER.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === HEADER.IGIC);

	// Sanitized Fields
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];

	// Rule
	if (ivaField && igicField) return false;

	return payload;
}
