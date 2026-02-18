"use server";

import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { Domain } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { upsertRegistrationRow } from "@/app/lib/googleSheets";

type ApplyState = {
	success: boolean;
	message: string;
};

export async function applyToDomain(
	prevState: ApplyState,
	formData: FormData,
): Promise<ApplyState> {
	try {
		const session = await requireUser();

		const domain = formData.get("domain") as Domain;

		// 🔹 fetch everything needed in one go
		const user = await prisma.user.findUnique({
			where: { id: session.userId },
			include: { profile: true },
		});

		if (!user || !user.profile) {
			return { success: false, message: "Complete profile first." };
		}

		// 🔹 DB write (source of truth)
		await prisma.application.create({
			data: {
				userId: session.userId,
				domain,
			},
		});

		// 🔹 decide sheet
		let sheetName: "registrations_year1" | "registrations_year2";

		if (user.profile.year === "FIRST") {
			sheetName = "registrations_year1";
		} else if (user.profile.year === "SECOND") {
			sheetName = "registrations_year2";
		} else {
			// only 1st & 2nd year are allowed for recruitment
			return { success: true, message: "Applied successfully." };
		}

		// 🔹 Google Sheets upsert
		await upsertRegistrationRow({
			sheetName,
			user: {
				name: user.name,
				email: user.email,
			},
			profile: {
				mobile: user.profile.mobile,
				rollNumber: user.profile.rollNumber,
				branch: user.profile.branch,
				institution: user.profile.institution,
			},
			newDomain: domain,
		});

		revalidatePath("/dashboard");

		return { success: true, message: "Applied successfully." };
	} catch (err) {
		console.error(err);
		return { success: false, message: "Try again." };
	}
}
