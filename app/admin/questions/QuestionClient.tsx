"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Domain } from "@/types/db";
import Link from "next/link";

type Props = {
	initialData: any;
};

export default function QuestionsClient({ initialData }: Props) {
	const router = useRouter();
	const params = useSearchParams();

	const page = Number(params.get("page") ?? 1);
	const domain = params.get("domain") ?? "COMMON";
	const roundId = params.get("roundId") ?? "";

	const updateParam = (key: string, value: string | number) => {
		const newParams = new URLSearchParams(params.toString());
		newParams.set(key, String(value));
		if (key === "domain" && value === "COMMON") {
			newParams.delete("domain");
		}
		if (key === "domain") {
			newParams.delete("roundId"); // ✅ prevents invalid round for new scope
		}
		router.push(`?${newParams.toString()}`);
	};

	return (
		<div className="">
			{/* Filters */}
			{/* <Link href="/admin/questions" className="btn w-fit">Back</Link> */}
			<Link href="/admin/questions/create-question" className="btn w-fit mb-6">
				Create Question
			</Link>
			<div className="flex flex-wrap gap-3 glass-card p-5 mb-6">
				<h2 className="text-white/75 text-lg font-bold tracking-wider">
					FILTERS
				</h2>
				<select
					value={domain}
					onChange={(e) => updateParam("domain", e.target.value)}
					className="glass-input appearance-none w-fit min-w-40"
				>
					<option className="bg-bg-elevated text-neutral-200" value="COMMON">
						COMMON
					</option>

					{Object.values(Domain).map((d) => (
						<option
							key={d}
							value={d}
							className="bg-bg-elevated text-neutral-200"
						>
							{d}
						</option>
					))}
				</select>

				<select
					value={roundId}
					onChange={(e) => updateParam("roundId", e.target.value)}
					className="glass-input appearance-none w-fit min-w-45"
				>
					<option className="bg-bg-elevated text-neutral-200" value="">
						ALL ROUNDS
					</option>

					{initialData.rounds.map((r: any) => (
						<option
							key={r.id}
							value={r.id}
							className="bg-color-bg-elevated text-neutral-200"
						>
							{r.title}
						</option>
					))}
				</select>
			</div>

			{/* List */}
			<div className="space-y-3">
				{initialData.data.map((q: any) => (
					<Link key={q.id} href={`/admin/questions/${q.id}`} className="mt-2">
						<div className="glass-card p-4 space-y-2">
							<div className="text-xs text-white/50">
								{q.round.title} •{" "}
								{q.round.scope == "DOMAIN" ? q.round.domain : "COMMON"} •{" "}
								{q.marks}
							</div>

							<div className="text-white/85">{q.question}</div>
						</div>
					</Link>
				))}
			</div>

			{/* Pagination */}
			<div className="flex items-center gap-3">
				<button
					disabled={page <= 1}
					onClick={() => updateParam("page", page - 1)}
					className="btn disabled:opacity-40"
				>
					Prev
				</button>

				<span className="text-sm text-white/60">
					{initialData.meta.page} / {initialData.meta.totalPages}
				</span>

				<button
					disabled={page >= initialData.meta.totalPages}
					onClick={() => updateParam("page", page + 1)}
					className="btn disabled:opacity-40"
				>
					Next
				</button>
			</div>
		</div>
	);
}
