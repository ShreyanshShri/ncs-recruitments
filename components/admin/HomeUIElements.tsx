import Link from "next/link";

export function StatCard({
	title,
	value,
	subtitle,
	href,
}: {
	title: string;
	value: number | string;
	subtitle?: string;
	href?: string;
}) {
	const content = (
		<div className="glass-card p-5 space-y-1 transition">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-3xl font-semibold">{value}</p>
			{subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
		</div>
	);

	if (href) return <Link href={href}>{content}</Link>;
	return content;
}

export function ChartCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="glass-card p-5 h-80">
			<p className="text-sm mb-4 text-muted-foreground">{title}</p>
			<div className="w-full h-60">{children}</div>
		</div>
	);
}
