import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div suppressHydrationWarning={true}>
			<Navbar />
			<SmoothScrollProvider>{children}</SmoothScrollProvider>
			<Footer />
		</div>
	);
}
