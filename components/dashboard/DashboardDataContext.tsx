"use client";

import { createContext, useContext } from "react";
import type { Domain } from "@/types/db";
import type { SubmissionStatus } from "@prisma/client";
import type { Round, Application } from "@/types/db";

/* ----------------------------- */
/* Types — match your data layer */
/* ----------------------------- */

export type RoundWithStatus = Round & {
	submissionStatus: SubmissionStatus;
};

export type DashboardData = {
	applications: Application[];
	availableDomains: Domain[];
	roundsByDomain: Record<Domain, RoundWithStatus[]>;
	commonRounds: RoundWithStatus[];
	user: any; // ← replace with your User type if exported
	notifications: any[]; // ← replace with Notification type if exported
	passedDomains: Domain[];
	upcomingDomains: Domain[];
};

/* ----------------------------- */
/* Context */
/* ----------------------------- */

const DashboardDataContext = createContext<DashboardData | null>(null);

/* ----------------------------- */
/* Provider */
/* ----------------------------- */

export function DashboardDataProvider({
	value,
	children,
}: {
	value: DashboardData;
	children: React.ReactNode;
}) {
	return (
		<DashboardDataContext.Provider value={value}>
			{children}
		</DashboardDataContext.Provider>
	);
}

/* ----------------------------- */
/* Hook */
/* ----------------------------- */

export function useDashboardData() {
	const ctx = useContext(DashboardDataContext);

	if (!ctx) {
		throw new Error(
			"useDashboardData must be used inside <DashboardDataProvider>",
		);
	}

	return ctx;
}
