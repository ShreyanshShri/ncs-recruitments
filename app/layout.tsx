import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/providers/landing-page/intro-provider";

// Configure The Last Shuriken font
const lastShuriken = localFont({
	src: "./fonts/TheLastShuriken.ttf",
	variable: "--font-shuriken", // This is the CSS variable you'll use
});

// const inter = Inter({
// 	subsets: ["latin"],
// 	variable: "--font-sans", // important for Tailwind mapping
// });

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"], // choose what you need
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Recruitments | NCS",
	description: "Official website for NCS Recruitments",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${roboto.variable} ${lastShuriken.variable}`}
			suppressHydrationWarning
		>
			<body className="font-sans antialiased">
				<IntroProvider>{children}</IntroProvider>
			</body>
		</html>
	);
}
