"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#E11D48", "#3B82F6", "#A855F7", "#F59E0B"];

export default function DomainPieChart({
	data,
}: {
	data: { name: string; value: number }[];
}) {
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
					{data.map((_, i) => (
						<Cell key={i} fill={COLORS[i % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	);
}
