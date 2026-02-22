"use server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";

export type MarkAttendanceState = {
	success: boolean;
	message: string;
};

export async function markAttendance(
	_: MarkAttendanceState,
	formData: FormData,
): Promise<MarkAttendanceState> {
	try {
		const admin = await requireAdmin();

		const roundId = formData.get("roundId") as string;
		const userId = formData.get("userId") as string;

		if (!roundId || !userId) {
			return { success: false, message: "Missing fields" };
		}

		// find submission (covers both common + domain)
		const submission = await prisma.submission.findFirst({
			where: {
				roundId,
				OR: [
					{ userId },
					{
						application: {
							userId,
						},
					},
				],
			},
			select: { id: true, attendanceAllowed: true },
		});

		if (!submission) {
			return { success: false, message: "Submission not found" };
		}

		if (submission.attendanceAllowed) {
			return { success: true, message: "Already marked" };
		}

		await prisma.submission.update({
			where: { id: submission.id },
			data: {
				attendanceAllowed: true,
				attendanceMarkedAt: new Date(),
				attendanceMarkedBy: admin.userId,
			},
		});

		return { success: true, message: "Attendance marked" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
}
