import { compose } from './compose.helper';
import { execute as identityRule } from './rules/by-line/identity-rule';
import { execute as netCalculatedRule } from './rules/by-line/net-calculated-rule';
import { execute as taxRule } from './rules/by-line/tax-rule';
import { execute as uniqueInvoiceRule } from './rules/by-lines/unique-invoice-rule';
import { Rules } from './rules/types';

export function rules({ header, line, lines, status }: Rules) {
	return compose(uniqueInvoiceRule, netCalculatedRule, taxRule, identityRule)({ header, line, lines, status });
}
