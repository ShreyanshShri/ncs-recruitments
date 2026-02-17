import { requireUser } from "@/app/lib/auth";
import { getMcqRoundForUser } from "./data";
import McqForm from "./mcq-form";

export default async function McqPage({
	params,
}: {
	params: Promise<{ domain: string; roundId: string }>;
}) {
	const { domain, roundId } = await params;
	const session = await requireUser();

	const result = await getMcqRoundForUser({
		userId: session.userId,
		domain,
		roundId,
	});

	// 1. Friendly Error UI
	if (result.status !== "SUCCESS") {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
				<div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
					<h2 className="text-xl font-bold text-amber-800 mb-2">Notice</h2>
					<p className="text-amber-700">{result.error}</p>
					<a href="/dashboard" className="mt-4 inline-block text-sm underline">
						Return to Dashboard
					</a>
				</div>
			</div>
		);
	}

	// 2. Success UI
	return (
		<div className="container mx-auto py-8">
			{/* <h1 className="text-2xl font-bold mb-6">{result.round?.name}</h1> */}
			<McqForm round={result.round} />
		</div>
	);
}
