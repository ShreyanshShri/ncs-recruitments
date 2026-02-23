"use server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { RoundScope, Year, Domain } from "@prisma/client";

export type NotificationState = {
	success?: boolean;
	error?: string;
};

export async function createNotification(
	_: NotificationState,
	formData: FormData,
): Promise<NotificationState> {
	try {
		await requireAdmin();

		const title = formData.get("title") as string;
		const body = formData.get("body") as string;
		const year = formData.get("year") as Year;
		const scope = formData.get("scope") as RoundScope;
		const domain = formData.get("domain") as Domain | null;

		if (!title || !body || !year || !scope) {
			return { error: "Missing required fields" };
		}

		if (scope === "DOMAIN" && !domain) {
			return { error: "Domain required for domain scope" };
		}

		await prisma.notification.create({
			data: {
				title,
				body,
				year,
				scope,
				domain: scope === "COMMON" ? null : domain,
			},
		});

		revalidatePath("/admin/notifications");
		revalidatePath("/dashboard");

		return { success: true };
	} catch (e: any) {
		console.error(e);
		return { error: "Failed to create notification" };
	}
}
