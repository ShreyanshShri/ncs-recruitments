"use client";

import { useEffect } from "react";

export type Toast = {
	id: string;
	title: string;
	body: string;
};

export default function NotificationToasts({
	toasts,
	removeToast,
}: {
	toasts: Toast[];
	removeToast: (id: string) => void;
}) {
	useEffect(() => {
		if (!toasts.length) return;

		const timers = toasts.map((t) => setTimeout(() => removeToast(t.id), 5000));

		return () => timers.forEach(clearTimeout);
	}, [toasts, removeToast]);

	return (
		<div className="fixed bottom-6 right-6 z-50 space-y-3 w-80 pointer-events-none">
			{toasts.map((t, index) => (
				<div
					key={t.id}
					className="pointer-events-auto rounded-lg border bg-bg-dark/95 backdrop-blur p-4 shadow-lg toast-fade-rise"
					style={{
						animationDelay: `${index * 120}ms`,
						animationFillMode: "both",
					}}
				>
					<div className="flex justify-between items-start gap-3">
						<div>
							<p className="font-semibold text-sm hero-fade-drop">{t.title}</p>

							<p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">
								{t.body}
							</p>
						</div>

						<button
							onClick={() => removeToast(t.id)}
							className="text-xs opacity-60 hover:opacity-100 transition-opacity"
						>
							✕
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
