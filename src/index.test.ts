import { parseCSV } from './index';

describe('ParseCSV', () => {
	it('Should throw an ERROR if get one line file', () => {
		const header = undefined;
		const lines = ['1,02/05/2019,1000,800,20,,ACERLaptop,B76430134,'];
		expect(() => parseCSV(header, lines)).toThrow('Header must not be empty');
	});

	it('Should return just header if no lines', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = [];
		expect(parseCSV(header, lines)).toEqual({
			header: 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente',
			lines: [],
		});

		const lines2 = undefined;
		expect(parseCSV(header, lines2)).toEqual({
			header: 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente',
			lines: [],
		});
	});

	it('Should remove repited lines with same Num _factura', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = [
			'1,02/05/2019,1000,800,20,,ACERLaptop,B76430134,',
			'2,03/08/2019,2000,1800,,10,MacBook Pro,,78544372A',
			'3,03/12/2019,1000,800,20,, LenovoLaptop,,78544372B',
			'2,03/12/2019,2000,1800,,10, LenovoLaptop,,78544372A',
		];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [lines[0], lines[2]],
		});
	});

	it('Should remove line if CIF and NIF exist in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,800,20,,ACERLaptop,B76430134,B76430134'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IVA and IGIC exist in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,800,20,20,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IVA is not number in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,800,TWENTTY,,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if IGIC is not number in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,800,,TWENTY,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Net balance is miscalculated in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,500,20,,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Net balance is not a number in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,FIVE HUNDRED,20,,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should remove line if Gross balance is not a number in same invoice line', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,ONE THOUSAND,500,20,,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [],
		});
	});

	it('Should return line if everything is OK', () => {
		const header = 'Num _factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente';
		const lines = ['1,02/05/2019,1000,800,20,,ACERLaptop,B76430134,'];
		expect(parseCSV(header, lines)).toEqual({
			header,
			lines: [lines[0]],
		});
	});
});
