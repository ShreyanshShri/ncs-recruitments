import type { Metadata } from "next";
import localFont from "next/font/local"; // Import the local loader
import "./globals.css";

// Configure The Last Shuriken font
const lastShuriken = localFont({
	src: "./fonts/TheLastShuriken.ttf",
	variable: "--font-shuriken", // This is the CSS variable you'll use
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
		<html lang="en">
			<body
				/* Apply the font variable to the body */
				className={`${lastShuriken.variable} font-sans antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}
