import { HEADER, SEPARATOR_CSV } from '../../../enums';
import { Rules } from '../../types';

function matchSameInvoice(indexToStart: number, invoiceNumber: string, value: string) {
	const regex = new RegExp(`^.{${indexToStart}}${invoiceNumber},.*`, 'gmi');
	return regex.test(value);
}

export function execute({ header, line, lines, status }: Rules): Rules {
	if (!header || !line) return { status: false, lines };

	// Format lines
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);

	// Position Index by Headers
	const invoiceNumberPositionByHeaders = headers.findIndex((field) => field === HEADER.INVOICE_NUMBER);
	const invoiceNumberField = fields[invoiceNumberPositionByHeaders];
	const sameInvoiceNumberInLines = lines?.filter((line) =>
		matchSameInvoice(invoiceNumberPositionByHeaders, invoiceNumberField, line)
	);
	if (sameInvoiceNumberInLines?.length > 1) return { status: false, lines };

	return {
		header,
		line,
		lines,
		status,
	};
}
