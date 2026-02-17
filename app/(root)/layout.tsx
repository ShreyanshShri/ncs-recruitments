// import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing_page/Footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div suppressHydrationWarning={true}>
			<Navbar />
			{/* <SmoothScrollProvider>{children}</SmoothScrollProvider> */}
			{children}
			<Footer />
		</div>
	);
}
