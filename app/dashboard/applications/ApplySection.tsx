"use client";

import { useState } from "react";
import { Domain } from "@/types/db";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { ApplySuccessModal } from "@/components/dashboard/ApplySuccessModal";

export default function ApplySection({
	availableDomains,
}: {
	availableDomains: Domain[];
}) {
	const [applyModal, setApplyModal] = useState<{
		open: boolean;
		domain: Domain | null;
		key?: string;
	}>({
		open: false,
		domain: null,
	});

	const handleApplyClick = (domain: Domain) => {
		setApplyModal({
			open: true,
			domain,
			key: crypto.randomUUID(),
		});
	};

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-shuriken text-primary-red">
				Apply to a Domain
				<p className="block text-sm text-beige/80 font-sans mt-3 tracking-widest">
					<span className="font-bold text-primary-red">Note: </span>
					You can only apply to one domain
				</p>
			</h2>

			<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
				{availableDomains.map((domain) => (
					<div
						key={domain}
						className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
					>
						<ApplicationCard
							type="available"
							domain={domain}
							onApplyClick={handleApplyClick}
						/>
					</div>
				))}
			</div>

			<ApplySuccessModal
				key={applyModal.key}
				open={applyModal.open}
				domain={applyModal.domain}
				onClose={() => setApplyModal({ open: false, domain: null, key: "" })}
			/>
		</div>
	);
}
