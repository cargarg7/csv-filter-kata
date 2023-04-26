import { compose } from '../compose.helper';
import { execute as identityRule } from './identity-rule';
import { execute as netCalculatedRule } from './net-calculated-rule';
import { execute as taxRule } from './tax-rule';
import { execute as uniqueInvoiceRule } from './unique-invoice-rule';

export function rules({ header, line, lines }) {
	return compose(netCalculatedRule, taxRule, identityRule, uniqueInvoiceRule)({ header, line, lines });
}
