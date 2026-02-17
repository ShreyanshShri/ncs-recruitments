"use server";

import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { Domain } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function applyToDomain(domain: Domain) {
	const session = await requireUser();

	await prisma.application.create({
		data: {
			userId: session.userId,
			domain,
		},
	});

	revalidatePath("/dashboard");
}
