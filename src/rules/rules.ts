import { RulesDecorator } from './types';
import { compose } from '../compose.helper';
import { ruleDecorator } from './decorators/rules.decorator';
import { isValid as identityRule } from './identity-rule';
import { isValid as netCalculatedRule } from './net-calculated-rule';
import { isValid as taxRule } from './tax-rule';
import { isValid as uniqueInvoiceRule } from './unique-invoice-rule';

export function rules({ header, line, lines }: RulesDecorator): boolean {
	const areValidValidationRules = compose(
		ruleDecorator(netCalculatedRule),
		ruleDecorator(taxRule),
		ruleDecorator(identityRule),
		ruleDecorator(uniqueInvoiceRule)
	)({ header, line, lines });
	return !!areValidValidationRules;
}
