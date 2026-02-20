"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export default function RegistrationsLineChart({
	data,
}: {
	data: { date: string; count: number }[];
}) {
	return (
		<ResponsiveContainer>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
				<XAxis dataKey="date" stroke="#a1a1aa" />
				<YAxis stroke="#a1a1aa" />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="count"
					stroke="#E11D48"
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
