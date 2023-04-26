export function matchSameInvoice(indexToStart: number, invoiceNumber: string, value: string) {
	const regex = new RegExp(`^.{${indexToStart}}${invoiceNumber},.*`, 'gmi');
	return regex.test(value);
}
