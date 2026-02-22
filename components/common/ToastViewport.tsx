"use client";

import { useState } from "react";
import NotificationToasts, { Toast } from "./ToastNotification";

export default function ToastViewport({
	initialToasts,
}: {
	initialToasts: Toast[];
}) {
	const [toasts, setToasts] = useState(initialToasts);

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return <NotificationToasts toasts={toasts} removeToast={removeToast} />;
}
