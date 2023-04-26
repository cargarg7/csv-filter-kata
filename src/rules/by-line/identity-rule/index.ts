import { HEADER, SEPARATOR_CSV } from '../../../enums';
import { Rules } from '../../types';

export function execute({ header, line, lines, status }: Rules): Rules {
	if (!header || !line) return { status: false, lines };

	// Format lines
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const cifPositionByHeaders = headers.findIndex((field) => field === HEADER.CIF);
	const nifPositionByHeaders = headers.findIndex((field) => field === HEADER.NIF);

	// Sanitized Fields
	const cifField = fields[cifPositionByHeaders];
	const nifField = fields[nifPositionByHeaders];

	// Rule
	if (cifField && nifField) return { status: false, lines };

	return {
		header,
		line,
		lines,
		status,
	};
}
