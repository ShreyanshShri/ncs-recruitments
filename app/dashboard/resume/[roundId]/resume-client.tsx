"use client";

import { useActionState, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { saveResume } from "@/app/actions/resume";

type State = {
	success?: boolean;
	error?: string;
};

const MAX_SIZE = 200 * 1024; // 200KB

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
	const [uploadError, setUploadError] = useState<string | null>(null);

	return (
		<div className="min-h-screen bg-bg-dark text-beige px-6 py-12">
			<div className="max-w-xl mx-auto space-y-8">
				<h1 className="text-3xl font-shuriken text-primary-red text-center tracking-wide">
					Upload Resume
				</h1>

				<div className="bg-beige text-bg-dark border border-border-red rounded-2xl p-8 space-y-6 shadow-lg">
					{alreadySubmitted ? (
						<div className="space-y-3 text-center">
							<p className="font-semibold text-green-700">PDF Submitted</p>

							<a
								href={existingResumeUrl!}
								target="_blank"
								className="underline text-sm font-shuriken tracking-wide text-primary-red hover:text-dark-red transition"
							>
								View uploaded resume
							</a>
						</div>
					) : (
						<form action={formAction} className="space-y-6">
							<input type="hidden" name="resumeUrl" id="resumeUrl" />

							{/* Upload */}
							<CldUploadWidget
								uploadPreset="ncs_resume"
								options={{
									resourceType: "raw",
									clientAllowedFormats: ["pdf"],
									maxFileSize: MAX_SIZE,
									folder: "ncs/resumes",
									styles: {
										frame: {
											background: "#120a0a", // bg-dark backdrop
										},

										palette: {
											window: "#e6d2b5", // beige modal
											sourceBg: "#e6d2b5", // inner content area also beige
											windowBorder: "#8e2320", // border-red

											textDark: "#120a0a", // text on beige
											textLight: "#120a0a",

											tabIcon: "#b0322c",
											menuIcons: "#b0322c",
											link: "#b0322c",
											action: "#b0322c", // primary buttons
											inProgress: "#b0322c",

											inactiveTabIcon: "#7a1e1b", // dark-red for muted icons

											error: "#b0322c",
											complete: "#b0322c",
										},
										fonts: {
											default: {
												active: true,
												family: "Shuriken, sans-serif",
											},
										},
									},
								}}
								onSuccess={(result: any) => {
									setUploadError(null);

									const info = result?.info;

									if (info?.bytes > MAX_SIZE) {
										setFileName(null);
										setUploadError("File must be less than 200KB");
										return;
									}

									const url = info?.secure_url;
									const name = info?.original_filename;

									const input = document.getElementById(
										"resumeUrl",
									) as HTMLInputElement;

									if (input && url) input.value = url;
									if (name) setFileName(`${name}.pdf`);
								}}
								onError={() => {
									setFileName(null);
									setUploadError("Upload failed. Try again.");
								}}
							>
								{({ open }) => (
									<button
										type="button"
										onClick={() => open()}
										className="w-full border border-border-red text-dark-red font-shuriken tracking-wide py-3 rounded-xl hover:bg-primary-red hover:text-light-beige transition"
									>
										{fileName ?? "Select PDF"}
									</button>
								)}
							</CldUploadWidget>

							<p className="text-xs text-center text-gray-600">
								PDF only • Max size: 200KB
							</p>

							<button
								type="submit"
								disabled={pending || !fileName}
								className="w-full bg-primary-red hover:bg-dark-red text-beige font-shuriken tracking-wide py-3 rounded-xl transition disabled:opacity-50"
							>
								{pending ? "Saving..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				{/* Client upload error */}
				{uploadError && (
					<p className="text-primary-red text-sm text-center font-medium">
						{uploadError}
					</p>
				)}

				{/* Server error */}
				{state?.error && (
					<p className="text-primary-red text-sm text-center font-medium">
						{state.error}
					</p>
				)}

				{/* Success */}
				{state?.success && !alreadySubmitted && (
					<p className="text-green-700 text-sm text-center font-medium">
						Resume uploaded successfully.
					</p>
				)}
			</div>
		</div>
	);
}
