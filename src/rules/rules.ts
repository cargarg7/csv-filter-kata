import { compose } from '../compose.helper';
import { ruleDecorator } from './decorators/rules.decorator';
import { invalid as identityRuleInvalid } from './identity-rule';
import { invalid as netCalculatedRuleInvalid } from './net-calculated-rule';
import { invalid as taxRuleInvalid } from './tax-rule';
import { invalid as uniqueInvoiceRuleInvalid } from './unique-invoice-rule';

export function rules({ header, line, lines }) {
	return compose(
		ruleDecorator(netCalculatedRuleInvalid),
		ruleDecorator(taxRuleInvalid),
		ruleDecorator(identityRuleInvalid),
		ruleDecorator(uniqueInvoiceRuleInvalid)
	)({ header, line, lines });
}
