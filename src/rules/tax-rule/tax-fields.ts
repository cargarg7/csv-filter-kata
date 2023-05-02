import { HEADER } from '../../enums/invoice-header-fields';

export const TAX_RULE_FIELDS = {
	IVA: HEADER.IVA,
	IGIC: HEADER.IGIC,
} as const;
