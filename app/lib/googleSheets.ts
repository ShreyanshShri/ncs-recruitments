import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
	},
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ auth, version: "v4" });

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

function normalizeDomains(domains: string[]) {
	return [...new Set(domains.map((d) => d.trim().toUpperCase()))].sort();
}

export async function upsertRegistrationRow({
	sheetName,
	user,
	profile,
	newDomain,
}: {
	sheetName: "registrations_year1" | "registrations_year2";
	user: { name: string | null; email: string };
	profile: {
		mobile: string;
		rollNumber: string;
		branch: string;
		institution: string;
	};
	newDomain: string;
}) {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: `${sheetName}!A:I`,
	});

	const rows = res.data.values || [];

	const emailIndex = rows.findIndex((r) => r[2] === user.email);

	// ===================== CREATE =====================
	if (emailIndex === -1) {
		const baseRow = [
			new Date().toISOString(),
			user.name ?? "",
			user.email,
			profile.mobile,
			profile.rollNumber,
			profile.branch,
			profile.institution,
			newDomain.toUpperCase(),
		];

		if (sheetName === "registrations_year2") {
			baseRow.push(""); // resume_url empty
		}

		await sheets.spreadsheets.values.append({
			spreadsheetId: SHEET_ID,
			range: `${sheetName}!A:I`,
			valueInputOption: "USER_ENTERED",
			requestBody: { values: [baseRow] },
		});

		return;
	}

	// ===================== UPDATE DOMAINS =====================

	const sheetRowNumber = emailIndex + 1;
	const existingDomains = rows[emailIndex][7] || "";

	const updatedDomains = normalizeDomains([
		...existingDomains.split(",").filter(Boolean),
		newDomain,
	]).join(",");

	await sheets.spreadsheets.values.update({
		spreadsheetId: SHEET_ID,
		range: `${sheetName}!H${sheetRowNumber}`,
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[updatedDomains]],
		},
	});
}

export async function updateResumeUrlByEmail({
	sheetName,
	email,
	resumeUrl,
}: {
	sheetName: "registrations_year2";
	email: string;
	resumeUrl: string;
}) {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: `${sheetName}!A:I`,
	});

	const rows = res.data.values || [];

	const emailIndex = rows.findIndex((r) => r[2] === email);

	if (emailIndex === -1) {
		// row should exist, but fail silently (DB is source of truth)
		console.warn("Sheet row not found for resume:", email);
		return;
	}

	const sheetRowNumber = emailIndex + 1;

	await sheets.spreadsheets.values.update({
		spreadsheetId: SHEET_ID,
		range: `${sheetName}!I${sheetRowNumber}`,
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[resumeUrl]],
		},
	});
}
