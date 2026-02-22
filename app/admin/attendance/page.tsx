import { prisma } from "@/app/lib/prisma";
import AttendanceClient from "./AttendanceClient";

export default async function Page() {
	const rounds = await prisma.round.findMany({
		orderBy: { order: "asc" },
		select: { id: true, title: true },
	});

	return <AttendanceClient rounds={rounds} />;
}
