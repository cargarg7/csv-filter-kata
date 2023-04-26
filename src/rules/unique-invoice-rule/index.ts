import { HEADER, SEPARATOR_CSV } from '../../enums';
import { RulesOrFalse } from '../types';
import { matchSameInvoice } from './match-same-invoice.helper';

const linesRemovedByRule = new Set();

export function execute(payload: RulesOrFalse): RulesOrFalse {
	if (typeof payload === 'boolean') return payload;

	// Format lines
	const { header, line, lines } = payload;
	const headers = header.split(SEPARATOR_CSV);
	const fields = line.split(SEPARATOR_CSV);
	// Position Index by Headers
	const invoiceNumberPositionByHeaders = headers.findIndex((field) => field === HEADER.INVOICE_NUMBER);
	const invoiceNumberField = fields[invoiceNumberPositionByHeaders];
	if (linesRemovedByRule.has(invoiceNumberField)) return false;

	const sameInvoiceNumberInLines = lines?.filter((line) =>
		matchSameInvoice(invoiceNumberPositionByHeaders, invoiceNumberField, line)
	);
	if (sameInvoiceNumberInLines?.length > 1) {
		linesRemovedByRule.add(invoiceNumberField);
		return false;
	}

	return payload;
}
