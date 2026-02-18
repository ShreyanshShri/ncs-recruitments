"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { logout } from "@/app/lib/session";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { RoundCard } from "@/components/dashboard/RoundCard";
import { ApplySuccessModal } from "@/components/dashboard/ApplySuccessModal";
import { Domain } from "@/types/db";
// import WindScene from "../landing_page/WindScene";

type Section = "applications" | "rounds" | "profile";

const NavButton = ({
	id,
	label,
	section,
	setSection,
	setSidebarOpen,
}: {
	id: Section;
	label: string;
	section: Section;
	setSection: (section: Section) => void;
	setSidebarOpen: (open: boolean) => void;
}) => (
	<button
		onClick={() => {
			setSection(id);
			setSidebarOpen(false);
		}}
		className={`cursor-pointer w-full text-left px-4 py-2 rounded-lg font-shuriken transition
			${
				section === id
					? "bg-primary-red text-beige"
					: "hover:bg-bg-dark/60 text-beige/80"
			}`}
	>
		{label}
	</button>
);

export default function DashboardShell({ data }: any) {
	const [section, setSection] = useState<Section>("applications");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { applications, availableDomains, commonRounds, roundsByDomain, user } =
		data;

	const [applyModal, setApplyModal] = useState<{
		open: boolean;
		domain: Domain | null;
	}>({
		open: false,
		domain: null,
	});

	const handleApplyClick = (domain: Domain) => {
		setApplyModal({ open: true, domain });
	};

	return (
		<div className="h-screen flex flex-col text-beige">
			{/* <WindScene particle_count={80} /> */}
			{/* 🔴 TOP BAR */}
			<header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border-red bg-bg-dark backdrop-blur shrink-0">
				<div className="flex items-center gap-3">
					{/* MOBILE MENU BUTTON */}
					<button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
						<Menu size={22} />
					</button>

					<h1 className="text-lg sm:text-xl font-shuriken">
						Welcome, <span className="text-primary-red">{user?.name}</span>
					</h1>
				</div>

				<form action={logout}>
					<button className="rounded-lg border border-border-red px-4 py-1.5 text-sm font-shuriken hover:bg-primary-red transition">
						Logout
					</button>
				</form>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* 🟠 SIDEBAR OVERLAY (MOBILE) */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-black/50 z-40 lg:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* 🟠 SIDEBAR */}
				<aside
					className={`
					fixed lg:static z-50 top-0 left-0 h-full w-64 bg-bg-dark/96 border-r border-border-red
					p-4 space-y-3 transform transition-transform
					${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
				`}
				>
					<div className="flex justify-between items-center lg:hidden mb-4">
						<span className="font-shuriken text-primary-red">Menu</span>
						<X
							className="cursor-pointer"
							onClick={() => setSidebarOpen(false)}
						/>
					</div>

					<NavButton
						id="applications"
						label="Applications"
						section={section}
						setSection={setSection}
						setSidebarOpen={setSidebarOpen}
					/>
					<NavButton
						id="rounds"
						label="Rounds"
						section={section}
						setSection={setSection}
						setSidebarOpen={setSidebarOpen}
					/>
					<NavButton
						id="profile"
						label="Profile"
						section={section}
						setSection={setSection}
						setSidebarOpen={setSidebarOpen}
					/>
				</aside>

				{/* 🟢 MAIN CONTENT */}
				<main className="flex-1 overflow-y-auto bg-bg-dark/96 p-4 sm:p-6 lg:p-10">
					{/* ================= APPLICATIONS ================= */}
					{section === "applications" && (
						<div className="space-y-12">
							{/* YOUR APPLICATIONS */}
							<div className="space-y-6">
								<h2 className="text-2xl font-shuriken text-primary-red">
									Your Applications
								</h2>

								{applications.length === 0 && (
									<p className="text-beige/70">No applications yet</p>
								)}

								<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
									{applications.map((app: any, index: number) => (
										<div
											key={index}
											className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
										>
											<ApplicationCard type="applied" application={app} />
										</div>
									))}
								</div>
							</div>

							{/* APPLY TO DOMAIN */}
							{availableDomains.length > 0 && (
								<div className="space-y-6">
									<h2 className="text-2xl font-shuriken text-primary-red">
										Apply to a Domain
									</h2>

									<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
										{availableDomains.map((domain: any) => (
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
								</div>
							)}
						</div>
					)}

					{/* ================= ROUNDS ================= */}
					{section === "rounds" && (
						<div className="space-y-10">
							{commonRounds.length > 0 && (
								<div className="space-y-4">
									<h3 className="text-lg font-shuriken text-beige/80">
										Common
									</h3>

									<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
										{commonRounds.map((round: any) => (
											<div
												key={round.id}
												className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
											>
												<RoundCard round={round} />
											</div>
										))}
									</div>
								</div>
							)}

							{Object.entries(roundsByDomain).map(([domain, rounds]: any) => (
								<div key={domain} className="space-y-4">
									<h3 className="text-lg font-shuriken text-beige/80">
										{domain}
									</h3>

									<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
										{rounds.map((round: any) => (
											<div
												key={round.id}
												className="rounded-2xl bg-beige text-bg-dark p-6"
											>
												<RoundCard round={round} />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}

					{/* ================= PROFILE ================= */}
					{section === "profile" && (
						<div className="max-w-3xl">
							<h2 className="text-3xl font-shuriken text-primary-red mb-8 tracking-wide">
								Profile
							</h2>

							<div className="relative rounded-2xl bg-bg-dark border border-border-red shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-hidden">
								{/* top accent bar */}
								<div className="h-1 w-full bg-primary-red" />

								<div className="p-6 sm:p-8 space-y-8">
									{/* NAME BLOCK */}
									<div className="space-y-1">
										<p className="text-sm uppercase tracking-widest text-beige/50 font-shuriken">
											Student
										</p>
										<p className="text-2xl sm:text-3xl font-shuriken text-beige">
											{user?.name || "—"}
										</p>
										<p className=" text-primary-red break-all">{user?.email}</p>
									</div>

									{/* DIVIDER */}
									<div className="h-px bg-border-red/60" />

									{/* PROFILE GRID */}
									{user?.profile ? (
										<div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 text-sm">
											<div>
												<p className="text-beige/50 font-shuriken tracking-wide">
													Roll Number
												</p>
												<p className="text-lg text-beige font-semibold">
													{user.profile.rollNumber}
												</p>
											</div>

											<div>
												<p className="text-beige/50 font-shuriken tracking-wide">
													Institution
												</p>
												<p className="text-lg text-beige font-semibold">
													{user.profile.institution}
												</p>
											</div>

											<div>
												<p className="text-beige/50 font-shuriken tracking-wide">
													Year
												</p>
												<p className="text-lg text-beige font-semibold">
													{user.profile.year}
												</p>
											</div>

											<div>
												<p className="text-beige/50 font-shuriken tracking-wide">
													Branch
												</p>
												<p className="text-lg text-beige font-semibold">
													{user.profile.branch}
												</p>
											</div>
										</div>
									) : (
										<p className="text-beige/60 italic">
											Profile not completed.
										</p>
									)}
								</div>
							</div>
						</div>
					)}
				</main>
				<ApplySuccessModal
					open={applyModal.open}
					domain={applyModal.domain}
					onClose={() => setApplyModal({ open: false, domain: null })}
				/>
			</div>
		</div>
	);
}
