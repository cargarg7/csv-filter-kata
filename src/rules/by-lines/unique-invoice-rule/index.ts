import { HEADER, SEPARATOR_CSV } from '../../../enums';
import { RuleByLinesOrFalse } from '../types';
import { matchSameInvoice } from './match-same-invoice.helper';

export function execute(payload: RuleByLinesOrFalse): RuleByLinesOrFalse {
	if (typeof payload === 'boolean') return payload;

	// Format lines
	const { header, lines } = payload;
	const headers = header.split(SEPARATOR_CSV);
	const linesFiltered = lines?.filter((line) => {
		const fields = line.split(SEPARATOR_CSV);
		// Position Index by Headers
		const invoiceNumberPositionByHeaders = headers.findIndex((field) => field === HEADER.INVOICE_NUMBER);
		const invoiceNumberField = fields[invoiceNumberPositionByHeaders];
		const sameInvoiceNumberInLines = lines?.filter((line) =>
			matchSameInvoice(invoiceNumberPositionByHeaders, invoiceNumberField, line)
		);
		return sameInvoiceNumberInLines?.length <= 1;
	});

	return {
		header,
		lines: linesFiltered,
	};
}
