import { RULE_VALIDATE_HAS_ERROR } from '../enums';
import { RulesInput } from '../types';
import { UNIQUE_INVOICE_NUMBER_RULE_FIELDS } from './enums';
import { matchSameInvoice } from './match-same-invoice.helper';

const linesRemovedByRule = new Set();

export function invalid({ headers, fields, lines }: RulesInput): boolean {
	// Position Index by Headers
	const invoiceNumberPositionByHeaders = headers.findIndex(
		(field) => field === UNIQUE_INVOICE_NUMBER_RULE_FIELDS.INVOICE_NUMBER
	);
	const invoiceNumberField = fields[invoiceNumberPositionByHeaders];
	if (linesRemovedByRule.has(invoiceNumberField)) return RULE_VALIDATE_HAS_ERROR.TRUE;

	const sameInvoiceNumberInLines = lines?.filter((line) =>
		matchSameInvoice(invoiceNumberPositionByHeaders, invoiceNumberField, line)
	);
	if (sameInvoiceNumberInLines?.length > 1) {
		linesRemovedByRule.add(invoiceNumberField);
		return RULE_VALIDATE_HAS_ERROR.TRUE;
	}

	return RULE_VALIDATE_HAS_ERROR.FALSE;
}
