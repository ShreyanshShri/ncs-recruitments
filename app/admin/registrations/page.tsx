import { prisma } from "@/app/lib/prisma";

const PAGE_SIZE = 10;

type Props = {
	searchParams: {
		page?: string;
	};
};

const Page = async ({ searchParams }: Props) => {
	const params = await searchParams;

	const currentPage = Number(params.page) || 1;
	const skip = (currentPage - 1) * PAGE_SIZE;

	const [users, totalCount] = await Promise.all([
		prisma.user.findMany({
			skip,
			take: PAGE_SIZE,
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,

				profile: {
					select: {
						rollNumber: true,
						mobile: true,
						institution: true,
						year: true,
						branch: true,
						linkedIn: true,
					},
				},
			},
		}),
		prisma.user.count(),
	]);

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);

	return (
		<div id="page" className="space-y-6 text-white">
			<h1 className="text-xl font-bold tracking-widest opacity-75">USERS</h1>

			<div className="glass-card overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="border-b border-glass-border-soft text-left">
							<tr className="text-light-beige">
								<th className="px-4 py-3">Name</th>
								<th className="px-4 py-3">Roll</th>
								<th className="px-4 py-3">Branch</th>
								<th className="px-4 py-3">Year</th>
								<th className="px-4 py-3">Institution</th>
								<th className="px-4 py-3">Mobile</th>
								<th className="px-4 py-3">LinkedIn</th>
							</tr>
						</thead>

						<tbody>
							{users.map((u) => (
								<tr
									key={u.id}
									className="border-b border-glass-border-soft hover:bg-white/5 transition"
								>
									<td className="px-4 py-3">
										<div className="font-medium">{u.name}</div>
										<div className="text-xs opacity-60">{u.email}</div>
									</td>

									<td className="px-4 py-3">{u.profile?.rollNumber || "—"}</td>

									<td className="px-4 py-3">{u.profile?.branch || "—"}</td>

									<td className="px-4 py-3">{u.profile?.year || "—"}</td>

									<td className="px-4 py-3">{u.profile?.institution || "—"}</td>

									<td className="px-4 py-3">{u.profile?.mobile || "—"}</td>

									<td className="px-4 py-3">
										{u.profile?.linkedIn ? (
											<a
												href={u.profile.linkedIn}
												target="_blank"
												className="btn text-xs"
											>
												LinkedIn
											</a>
										) : (
											"—"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="flex gap-2">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
					<a
						key={p}
						href={`?page=${p}`}
						className={`btn ${p === currentPage ? "bg-white/15" : ""}`}
					>
						{p}
					</a>
				))}
			</div>
		</div>
	);
};

export default Page;
