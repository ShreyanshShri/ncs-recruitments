import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const QUESTIONS = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Mark Language",
      "HyperText Markup Language",
      "HyperText Markup Listing",
      "HyperText Machine Language",
    ],
    answer: 1,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "size"],
    answer: 2,
  },
];

const TOTAL_TIME = 10 * 60; // 10 minutes

export default function TestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  /* ⏱ Timer */
  useEffect(() => {
    if (timeLeft <= 0) handleSubmit();
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  /* Mark visited */
  useEffect(() => {
    setVisited((v) => ({ ...v, [current]: true }));
  }, [current]);

  const handleAnswer = (idx) => {
    setAnswers({ ...answers, [current]: idx });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  if (submitted) {
    const score = QUESTIONS.reduce(
      (s, q, i) => (answers[i] === q.answer ? s + 1 : s),
      0,
    );

    return (
      <div className="min-h-screen bg-bgDark flex flex-col items-center justify-center">
        <h1 className="font-shuriken text-beige text-4xl tracking-widest">
          TEST SUBMITTED
        </h1>
        <p className="text-lightBeige mt-4">
          Score: <span className="text-primaryRed">{score}</span> /{" "}
          {QUESTIONS.length}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgDark text-beige relative">
      {/* Transparent Navbar */}
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* LEFT – QUESTION LIST */}
        <div
          className="border-2 border-borderRed bg-bgDark/60 p-4
          shadow-[0_0_25px_rgba(176,50,44,0.3)]"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="tracking-widest text-xl font-bold font-shuriken">
              QUESTIONS
            </span>
            <span className="text-primaryRed">{formatTime(timeLeft)}</span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {QUESTIONS.map((_, i) => {
              const isCurrent = i === current;
              const isAnswered = answers[i] !== undefined;

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`
                    h-10 w-10 text-sm border font-shuriken rounded-full
                    ${
                      isCurrent
                        ? "bg-primaryRed border-primaryRed"
                        : isAnswered
                          ? "bg-primaryRed/40 border-primaryRed"
                          : visited[i]
                            ? "border-lightBeige"
                            : "border-borderRed"
                    }
                  `}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT – QUESTION PANEL */}
        <div
          className="border-2 border-borderRed bg-bgDark/70 p-8
          shadow-[0_0_30px_rgba(176,50,44,0.35)] relative overflow-hidden"
        >
          {/* Texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          <div className="relative">
            <h2 className="mb-6 tracking-wide text-xl font-bold">
              Q{current + 1}. {QUESTIONS[current].question}
            </h2>

            <div className="space-y-4">
              {QUESTIONS[current].options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex rounded-xl items-center gap-3 px-4 py-3 border cursor-pointer
                    ${
                      answers[current] === i
                        ? "border-primaryRed bg-primaryRed/20"
                        : "border-borderRed"
                    }`}
                >
                  <input
                    type="radio"
                    checked={answers[current] === i}
                    onChange={() => handleAnswer(i)}
                    className="accent-primaryRed"
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((c) => c - 1)}
                className="border font-shuriken rounded-xl border-borderRed px-6 py-2 disabled:opacity-40"
              >
                PREVIOUS
              </button>

              {current === QUESTIONS.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="border font-shuriken rounded-xl border-primaryRed px-6 py-2 hover:bg-primaryRed transition"
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  onClick={() => setCurrent((c) => c + 1)}
                  className="border font-shuriken rounded-xl border-borderRed px-6 py-2 hover:bg-primaryRed transition"
                >
                  NEXT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
