import { RulesInput } from '../common/types/rules-decorator';
import { UNIQUE_INVOICE_NUMBER_RULE_FIELDS } from './unique-invoice-fields';
import { matchSameInvoice } from './match-same-invoice';

export function isValid({ headers, fields, lines }: RulesInput): boolean {
	// Find Position Index by Headers fields
	const invoiceNumberPositionByHeaders = headers.findIndex(
		(field) => field === UNIQUE_INVOICE_NUMBER_RULE_FIELDS.INVOICE_NUMBER
	);
	// Get Fields in line by Index
	const invoiceNumberField = fields[invoiceNumberPositionByHeaders];

	// SameInvoiceNumber Validation Rule
	const sameInvoiceNumberInLines = lines?.filter((line) =>
		matchSameInvoice(invoiceNumberPositionByHeaders, invoiceNumberField, line)
	);
	return sameInvoiceNumberInLines?.length === 1;
}
