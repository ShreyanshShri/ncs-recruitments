import { requireAdmin } from "@/app/lib/auth";
import { CreateRoundForm } from "@/components/admin/CreateRoundForm";

export default async function NewRoundPage() {
	await requireAdmin();

	return (
		<div className="max-w-2xl mx-auto py-10">
			<h1 className="text-2xl font-semibold mb-6">Create New Round</h1>
			<CreateRoundForm />
		</div>
	);
}
