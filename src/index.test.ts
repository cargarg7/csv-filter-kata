import { parseCSV } from './index';

describe('ParseCSV', () => {
	const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';

	it('Should throw an ERROR if no header', () => {
		const header = undefined;
		const lines = [withOneInvoiceLineHaving()];
		expect(() => parseCSV(header, lines)).toThrow('Header must not be empty');
	});

	it('Should return just header if no lines', () => {
		const lines = [];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});

		const lines2 = undefined;
		expect(parseCSV(header, lines2)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove repited lines with same Num _factura', () => {
		const lines = [
			withOneInvoiceLineHaving({ invoiceId: '1' }),
			withOneInvoiceLineHaving({ invoiceId: '2' }),
			withOneInvoiceLineHaving({ invoiceId: '3' }),
			withOneInvoiceLineHaving({ invoiceId: '2' }),
		];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [lines[0], lines[2]],
		});
	});

	it('Should remove line if CIF and NIF exist in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ nif: 'B76430134' })];

		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IVA and IGIC exist in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ igicTax: '20' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IVA is not number in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ ivaTax: 'TWENTY' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IGIC is not number in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ igicTax: 'TWENTY' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Net balance is miscalculated with ivaTax in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ netImport: '500' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Net balance is miscalculated with igicTax in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ netImport: '500', ivaTax: '', igicTax: '20' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Net balance is not a number in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ netImport: 'FIVE HUNDRED' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Gross balance is not a number in same invoice line', () => {
		const lines = [withOneInvoiceLineHaving({ grossImport: 'ONE THOUSAND' })];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should return line if everything is OK', () => {
		const lines = [withOneInvoiceLineHaving()];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [lines[0]],
		});
	});

	function withOneInvoiceLineHaving({
		invoiceId = '1',
		date = '02/05/2019',
		grossImport = '1000',
		netImport = '800',
		ivaTax = '20',
		igicTax = '',
		concept = 'ACERLaptop',
		cif = 'B76430134',
		nif = '',
	} = {}): string {
		return [invoiceId, date, grossImport, netImport, ivaTax, igicTax, concept, cif, nif].join(',');
	}
});
