import { prisma } from "@/app/lib/prisma";
import { Domain, RoundScope } from "@prisma/client";

type Params = {
	page: number;
	pageSize: number;
	domain?: Domain;
	roundId?: string;
};

export async function getPaginatedQuestions({
	page,
	pageSize,
	domain,
	roundId,
}: Params) {
	const skip = (page - 1) * pageSize;

	const scope = domain ? RoundScope.DOMAIN : RoundScope.COMMON;

	const where = {
		round: {
			scope,
			...(domain ? { domain } : {}),
			...(roundId ? { id: roundId } : {}),
		},
	};

	const [data, total, rounds] = await Promise.all([
		prisma.question.findMany({
			where,
			include: {
				round: {
					select: {
						id: true,
						title: true,
						domain: true,
						scope: true,
						createdAt: true,
					},
				},
			},
			orderBy: {
				round: {
					createdAt: "desc",
				},
			},
			skip,
			take: pageSize,
		}),

		prisma.question.count({ where }),

		prisma.round.findMany({
			where: {
				scope,
				...(domain ? { domain } : {}),
			},
			select: {
				id: true,
				title: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		}),
	]);

	return {
		data,
		rounds,
		meta: {
			total,
			page,
			pageSize,
			totalPages: Math.ceil(total / pageSize),
		},
	};
}
