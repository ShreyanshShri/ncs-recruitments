"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { Domain } from "@/types/db";
import { applyToDomain } from "@/app/actions/dashboard";
import { domainExtraField } from "@/app/lib/domainExtraFeilds";

type Props = {
	open: boolean;
	domain: Domain | null;
	onClose: () => void;
};

type ApplyState = {
	success: boolean;
	message: string;
};

const initialState: ApplyState = {
	success: false,
	message: "",
};

export function ApplySuccessModal({ open, domain, onClose }: Props) {
	const [state, formAction, pending] = useActionState(
		applyToDomain,
		initialState,
	);

	useEffect(() => {
		if (state.success) {
			// allow RSC refresh to flip card, then close modal
			setTimeout(onClose, 1200);
		}
	}, [state.success, onClose]);

	if (!open || !domain) return null;

	const config = domainExtraField[domain];

	return (
		<div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="w-[92%] max-w-md rounded-2xl border border-border-red bg-bg-dark p-6 space-y-6">
				{!state.success && (
					<>
						<h2 className="text-xl font-shuriken text-primary-red">
							Help us evaluate you better
						</h2>

						<p className="text-sm text-beige/70">
							Add your {config.label} profile (optional)
						</p>

						<form action={formAction} className="space-y-4">
							<input type="hidden" name="domain" value={domain} />

							<input
								name="extra"
								placeholder={config.placeholder}
								className="w-full rounded-lg bg-transparent border border-border-red px-3 py-2 text-beige outline-none focus:border-primary-red"
							/>

							<div className="flex justify-between gap-3">
								<button
									type="button"
									onClick={onClose}
									className="text-sm text-beige/60 hover:text-beige"
								>
									Cancel
								</button>

								<button
									disabled={pending}
									className="px-4 py-2 rounded-lg bg-primary-red text-beige text-sm font-shuriken disabled:opacity-50"
								>
									{pending ? "Submitting..." : "Submit application"}
								</button>
							</div>
						</form>

						{state.message && (
							<p className="text-xs text-center text-beige/70">
								{state.message}
							</p>
						)}
					</>
				)}

				{state.success && (
					<div className="text-center space-y-4">
						<p className="text-3xl">✓</p>

						<h3 className="text-lg font-shuriken text-primary-red">
							Application submitted
						</h3>

						<p className="text-sm text-beige/70">
							Your journey for {domain} has begun.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
