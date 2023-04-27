export type RulesDecorator = {
	header: string;
	line: string;
	lines: string[];
};

export type RulesOrFalse = RulesDecorator | false;

export type RulesInput = {
	headers: string[];
	fields: string[];
	lines: string[];
};

export type RulesCallback = (payload: RulesInput) => boolean;
