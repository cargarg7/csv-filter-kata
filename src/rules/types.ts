type BasicRules = {
	header: string;
};

export type RulesByLine = BasicRules & {
	line: string;
};

export type RulesByLines = BasicRules & {
	lines: string[];
};
