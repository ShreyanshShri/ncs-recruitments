import { requireUser } from "@/app/lib/auth";
import { getMcqRoundForUser } from "./data";
import McqForm from "./mcq-form";
import Link from "next/link";

export default async function McqPage({
	params,
}: {
	params: Promise<{ domain: string; roundId: string }>;
}) {
	const { roundId } = await params;
	const session = await requireUser();

	const result = await getMcqRoundForUser({
		userId: session.userId,
		roundId,
	});

	/* ❌ Friendly Error / Notice */
	if (result.status !== "SUCCESS") {
		return (
			<div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
				<div className="bg-light-beige text-bg-dark border border-border-red rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-lg">
					<h2 className="text-2xl font-shuriken text-dark-red">Notice</h2>

					<p className="text-md">{result.error}</p>

					<Link
						href="/dashboard"
						className="underline cursor-pointer inline-block mt-2 text-primary-red font-shuriken tracking-wide hover:text-dark-red transition"
					>
						Return to Dashboard
					</Link>
				</div>
			</div>
		);
	}

	/* ✅ Success */
	return <McqForm round={result.round} />;
}
