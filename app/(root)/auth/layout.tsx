import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	if (user) {
		redirect("/dashboard");
	}

	return <div suppressHydrationWarning={true}>{children}</div>;
}
