import { compose } from '../compose.helper';
import { ruleDecorator } from './rules.decorator';
import { execute as identityRule } from './identity-rule';
import { execute as netCalculatedRule } from './net-calculated-rule';
import { execute as taxRule } from './tax-rule';
import { execute as uniqueInvoiceRule } from './unique-invoice-rule';

export function rules({ header, line, lines }) {
	return compose(
		ruleDecorator(netCalculatedRule),
		ruleDecorator(taxRule),
		ruleDecorator(identityRule),
		ruleDecorator(uniqueInvoiceRule)
	)({ header, line, lines });
}
