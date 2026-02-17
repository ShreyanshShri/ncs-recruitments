"use server";

import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { Domain } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

		await prisma.application.create({
			data: {
				userId: session.userId,
				domain,
			},
		});

		revalidatePath("/dashboard");

		return { success: true, message: "Applied successfully." };
	} catch {
		return { success: false, message: "Try again." };
	}
}
