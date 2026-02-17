// import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div suppressHydrationWarning={true}>
			{/* <SmoothScrollProvider>{children}</SmoothScrollProvider> */}
			{children}
		</div>
	);
}
