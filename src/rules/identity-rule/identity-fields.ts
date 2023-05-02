import { HEADER } from '../../enums/invoice-header-fields';

export const IDENTITY_RULE_FIELDS = {
	CIF: HEADER.CIF,
	NIF: HEADER.NIF,
} as const;
