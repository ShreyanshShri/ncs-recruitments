import { Domain } from "@/types/db";

export const domainExtraField: Record<
	Domain,
	{ label: string; placeholder: string }
> = {
	PROGRAMMING: {
		label: "Codeforces / CodeChef ID",
		placeholder: "tourist",
	},
	DEV: {
		label: "GitHub",
		placeholder: "shreyanshShri",
	},
	DESIGN: {
		label: "Behance",
		placeholder: "behance.net/username",
	},
	TECHNICAL: {
		label: "Kaggle",
		placeholder: "kaggler123",
	},
};
