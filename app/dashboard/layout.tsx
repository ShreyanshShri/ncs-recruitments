import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard | NCS Recruitments",
	description: "Official website for NCS Recruitments",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
