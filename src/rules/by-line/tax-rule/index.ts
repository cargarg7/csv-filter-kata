import { HEADER, SEPARATOR_CSV } from '../../../enums';
import { Rules } from '../../types';

export function execute({ header, line, lines, status }: Rules): Rules {
	if (!header || !line) return { status: false, lines };

	// Format lines
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const ivaPositionByHeaders = headers.findIndex((field) => field === HEADER.IVA);
	const igicPositionByHeaders = headers.findIndex((field) => field === HEADER.IGIC);

	// Sanitized Fields
	const ivaField = fields[ivaPositionByHeaders];
	const igicField = fields[igicPositionByHeaders];

	// Rule
	if (ivaField && igicField) return { status: false, lines };

	return {
		header,
		line,
		lines,
		status,
	};
}
