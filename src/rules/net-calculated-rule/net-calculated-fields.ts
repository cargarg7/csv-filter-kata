import { HEADER } from '../../enums/invoice-header-fields';

export const NET_CALCULATED_RULE_FIELDS = {
	GROSS: HEADER.IMPORT_GROSS,
	NET: HEADER.IMPORT_NET,
	IVA: HEADER.IVA,
	IGIC: HEADER.IGIC,
} as const;
