"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { submitMcq } from "@/app/actions/questions";

type QState = {
	answer: string | null;
	visited: boolean;
};

export default function McqForm({ round }: { round: any }) {
	const storageKey = `mcq_round_${round.id}`;
	const questions = round.questions;

	const formRef = useRef<HTMLFormElement>(null);

	// const TEST_DURATION = 30 * 60; // 30 min in seconds
	const TEST_DURATION = 20; // 30 min in seconds
	const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
	const hasSubmittedRef = useRef(false);

	/* ---------------- STATE ---------------- */

	const [currentIndex, setCurrentIndex] = useState(0);
	const [qState, setQState] = useState<Record<string, QState>>(() => {
		const saved =
			typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

		if (saved) return JSON.parse(saved);

		const init: Record<string, QState> = {};
		round.questions.forEach((q: any, i: number) => {
			init[q.id] = {
				answer: null,
				visited: i === 0,
			};
		});

		return init;
	});

	const [state, formAction, isPending] = useActionState(submitMcq, {});

	/* ---------------- PERSIST ---------------- */

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(qState));
	}, [qState, storageKey]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(interval);

					if (!hasSubmittedRef.current) {
						hasSubmittedRef.current = true;

						setTimeout(() => {
							formRef.current?.requestSubmit();
						}, 0);
					}

					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formattedTime = useMemo(() => {
		const m = Math.floor(timeLeft / 60)
			.toString()
			.padStart(2, "0");

		const s = (timeLeft % 60).toString().padStart(2, "0");

		return `${m}:${s}`;
	}, [timeLeft]);

	/* ---------------- HELPERS ---------------- */

	const goToQuestion = (index: number) => {
		const q = questions[index];
		if (!q) return;

		setCurrentIndex(index);

		setQState((prev) => ({
			...prev,
			[q.id]: {
				...prev[q.id],
				visited: true,
			},
		}));
	};

	const handleAnswer = (qid: string, value: string) => {
		setQState((prev) => ({
			...prev,
			[qid]: {
				answer: value,
				visited: true,
			},
		}));
	};

	const getStatus = (qid: string) => {
		const q = qState[qid];
		if (!q?.visited) return "unvisited";
		if (q.answer) return "attempted";
		return "left";
	};

	const statusStyle = (status: string, isCurrent: boolean) => {
		if (isCurrent) return "bg-primary-red text-beige";

		switch (status) {
			case "attempted":
				return "bg-green-600 text-white";
			case "left":
				return "bg-yellow-500 text-black";
			default:
				return "bg-bg-dark border border-border-red";
		}
	};

	const currentQ = questions[currentIndex];

	/* ---------------- FORM HIDDEN INPUTS ---------------- */

	const hiddenInputs = useMemo(() => {
		return Object.entries(qState).map(([qid, data]) => (
			<input
				key={qid}
				type="hidden"
				name={`responses.${qid}`}
				value={data.answer ?? ""}
			/>
		));
	}, [qState]);

	/* ---------------- UI ---------------- */

	return (
		<div className="min-h-screen bg-bg-dark text-beige flex">
			<form ref={formRef} action={formAction} className="flex w-full">
				<input type="hidden" name="roundId" value={round.id} />
				{hiddenInputs}

				{/* ---------------- LEFT PALETTE ---------------- */}
				<div className="w-64 border-r border-border-red p-4 space-y-4 flex flex-col justify-between">
					<div>
						<h2 className="font-shuriken text-primary-red text-xl mb-8">
							{round.title}
						</h2>

						<div className="mb-6 text-center">
							<p className="text-sm text-light-beige">Time Left</p>
							<p
								className={`font-shuriken text-2xl ${
									timeLeft <= 60 ? "text-primary-red" : "text-beige"
								}`}
							>
								{formattedTime}
							</p>
						</div>

						<div className="grid grid-cols-4 gap-2">
							{questions.map((q: any, i: number) => {
								const status = getStatus(q.id);

								return (
									<button
										type="button"
										key={q.id}
										onClick={() => goToQuestion(i)}
										className={`h-10 rounded-lg text-sm ${statusStyle(
											status,
											i === currentIndex,
										)}`}
									>
										{i + 1}
									</button>
								);
							})}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isPending}
							className="w-full bg-primary-red hover:bg-dark-red text-beige font-shuriken tracking-wide py-3 rounded-xl transition disabled:opacity-50"
						>
							{isPending ? "Submitting..." : "Submit Answers"}
						</button>

						{state?.error && (
							<p className="text-primary-red text-center font-medium">
								{state.error}
							</p>
						)}
					</div>
				</div>

				{/* ---------------- RIGHT PANEL ---------------- */}
				<div className="flex-1 px-6 py-10 max-w-3xl mx-auto space-y-6">
					{/* <h1 className="text-3xl font-shuriken text-primary-red text-center">
						MCQ Round
					</h1> */}

					<div className="bg-beige text-bg-dark p-6 rounded-2xl border border-border-red space-y-4">
						<p className="font-shuriken text-dark-red text-lg">
							Q{currentIndex + 1}. {currentQ.question}
						</p>

						{/* MCQ */}
						{currentQ.type === "MCQ" &&
							currentQ.options.map((opt: string, idx: number) => (
								<label
									key={opt}
									className="flex gap-3 p-3 rounded-lg cursor-pointer border border-light-beige hover:border-border-red"
								>
									<input
										type="radio"
										checked={qState[currentQ.id]?.answer === String(idx + 1)}
										onChange={() => handleAnswer(currentQ.id, String(idx + 1))}
									/>
									<span>{opt}</span>
								</label>
							))}

						{/* INPUT */}
						{currentQ.type === "INPUT" && (
							<input
								type="text"
								value={qState[currentQ.id]?.answer ?? ""}
								onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
								className="w-full bg-bg-dark text-beige border border-border-red rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-red"
							/>
						)}
					</div>

					<div className="flex justify-between gap-4">
						<button
							type="button"
							onClick={() => goToQuestion(currentIndex - 1)}
							disabled={currentIndex === 0}
							className="flex-1 border border-border-red text-beige py-3 rounded-xl
				   hover:bg-border-red/20 transition
				   disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Previous
						</button>

						<button
							type="button"
							onClick={() => goToQuestion(currentIndex + 1)}
							disabled={currentIndex === questions.length - 1}
							className="flex-1 bg-primary-red text-beige py-3 rounded-xl
				   hover:bg-dark-red transition
				   disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
