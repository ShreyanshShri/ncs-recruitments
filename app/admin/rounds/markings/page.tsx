import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";
import MarkingSchemeClient from "./marking-client";

export default async function Page() {
	await requireAdmin();

	const rounds = await prisma.round.findMany({
		where: { type: "OFFLINE" },
		select: {
			id: true,
			title: true,
			domain: true,
		},
		orderBy: { createdAt: "desc" },
	});

	console.log(rounds);

	return (
		<div className="max-w-2xl mx-auto py-10">
			<h1 className="text-xl font-semibold mb-6">Configure Marking Scheme</h1>

			<MarkingSchemeClient rounds={rounds} />
		</div>
	);
}
