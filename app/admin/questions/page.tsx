import { getPaginatedQuestions } from "./data";
import QuestionsClient from "./QuestionClient";
import { Domain } from "@prisma/client";

type Props = {
	searchParams: {
		page?: string;
		domain?: Domain;
		roundId?: string;
	};
};

export default async function Page({ searchParams }: Props) {
	// 1. Unwrap the promise first
	const params = await searchParams;

	// 2. Access the properties from the resolved object
	const page = Number(params.page ?? 1);
	const pageSize = 10;

	const data = await getPaginatedQuestions({
		page,
		pageSize,
		domain: params.domain as Domain | undefined, // Cast or handle if it's string[]
		roundId: params.roundId as string,
	});

	return (
		<div className="p-6">
			<QuestionsClient initialData={data} />
		</div>
	);
}
