import { requireUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import ResumeClient from "./resume-client";

export default async function Page({
	params,
}: {
	params: { roundId: string };
}) {
	const session = await requireUser();
	const userId = session.userId;
	const { roundId } = await params;

	const submission = await prisma.submission.findUnique({
		where: {
			userId_roundId: { userId, roundId },
		},
		select: {
			resumeUrl: true,
		},
	});

	console.log("submission", submission);

	return (
		<ResumeClient
			roundId={roundId}
			existingResumeUrl={submission?.resumeUrl ?? null}
		/>
	);
}
