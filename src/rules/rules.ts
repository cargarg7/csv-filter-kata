import { compose } from '../compose.helper';
import { execute as identityRule } from './by-line/identity-rule';
import { execute as netCalculatedRule } from './by-line/net-calculated-rule';
import { execute as taxRule } from './by-line/tax-rule';
import { execute as uniqueInvoiceRule } from './by-lines/unique-invoice-rule';

export function rulesByLine(header: string) {
	return (line: string) => compose(netCalculatedRule, taxRule, identityRule)({ header, line });
}

export function rulesByLines(header: string) {
	return (lines: string[]) => compose(uniqueInvoiceRule)({ header, lines });
}
