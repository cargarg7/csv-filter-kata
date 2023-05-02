import { RulesDecorator } from './common/types/rules-decorator';
import { isValidRuleOrNext } from './common/decorators/is-valid-rule-or-next';
import { compose } from '../helpers/compose-functions';
import { isValid as identityRule } from './identity-rule';
import { isValid as netCalculatedRule } from './net-calculated-rule';
import { isValid as taxRule } from './tax-rule';
import { isValid as uniqueInvoiceRule } from './unique-invoice-rule';

export function rules({ header, line, lines }: RulesDecorator): boolean {
	const areValidValidationRules = compose(
		isValidRuleOrNext(netCalculatedRule),
		isValidRuleOrNext(taxRule),
		isValidRuleOrNext(identityRule),
		isValidRuleOrNext(uniqueInvoiceRule)
	)({ header, line, lines });
	return !!areValidValidationRules;
}
