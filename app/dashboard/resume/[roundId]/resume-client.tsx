"use client";

import { useActionState, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { saveResume } from "@/app/actions/resume";

type State = {
	success?: boolean;
	error?: string;
};

export default function ResumeClient({
	roundId,
	existingResumeUrl,
}: {
	roundId: string;
	existingResumeUrl: string | null;
}) {
	const alreadySubmitted = Boolean(existingResumeUrl);

	const [state, formAction, pending] = useActionState<State, FormData>(
		saveResume.bind(null, roundId),
		{},
	);
	const [fileName, setFileName] = useState<string | null>(null);

	return (
		<div className="min-h-screen bg-bg-dark text-beige px-6 py-12">
			<div className="max-w-xl mx-auto space-y-8">
				{/* Heading */}
				<h1 className="text-3xl font-shuriken text-primary-red text-center tracking-wide">
					Upload Resume
				</h1>

				<div className="bg-light-beige text-bg-dark border border-border-red rounded-2xl p-8 space-y-6 shadow-lg">
					{/* ✅ Already submitted */}
					{alreadySubmitted ? (
						<div className="space-y-3 text-center">
							<p className="font-semibold text-green-700">PDF submitted</p>

							<a
								href={existingResumeUrl!}
								target="_blank"
								className="underline cursor-pointer inline-block text-sm font-shuriken tracking-wide text-primary-red hover:text-dark-red transition"
							>
								View uploaded resume
							</a>
						</div>
					) : (
						<form action={formAction} className="space-y-6">
							<input type="hidden" name="resumeUrl" id="resumeUrl" />

							{/* Upload button */}
							<CldUploadWidget
								uploadPreset="ncs_resume"
								options={{
									resourceType: "raw",
									clientAllowedFormats: ["pdf"],
									maxFileSize: 5_000_000,
									folder: "ncs/resumes",
								}}
								onSuccess={(result: any) => {
									const url = result?.info?.secure_url;
									const input = document.getElementById(
										"resumeUrl",
									) as HTMLInputElement;
									const name = result?.info?.original_filename;

									if (input && url) input.value = url;
									if (name) setFileName(`${name}.pdf`);
								}}
							>
								{({ open }) => (
									<button
										type="button"
										onClick={() => open()}
										className="cursor-pointer w-full border border-border-red text-dark-red font-shuriken tracking-wide py-3 rounded-xl hover:bg-primary-red hover:text-light-beige transition"
									>
										{fileName ?? "Select PDF"}
									</button>
								)}
							</CldUploadWidget>

							{/* Submit */}
							<button
								type="submit"
								disabled={pending}
								className="w-full bg-primary-red hover:bg-dark-red text-beige font-shuriken tracking-wide py-3 rounded-xl transition disabled:opacity-50"
							>
								{pending ? "Saving..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				{/* Messages */}
				{state?.error && (
					<p className="text-primary-red text-sm text-center font-medium">
						{state.error}
					</p>
				)}

				{state?.success && !alreadySubmitted && (
					<p className="text-green-700 text-sm text-center font-medium">
						Resume uploaded successfully.
					</p>
				)}
			</div>
		</div>
	);
}
