import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const baseUrl = process.env.DATABASE_URL!;
// Check if we are connecting to a local instance
const isLocal = baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");

// 1. Only append SSL flags if we are NOT on local
let connectionString = baseUrl;
if (!isLocal) {
	connectionString = baseUrl.includes("sslmode=")
		? baseUrl.replace(/sslmode=[^&]+/, "sslmode=verify-full")
		: `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}sslmode=verify-full`;
}

const pool = new Pool({
	connectionString,
	// 2. Disable SSL entirely for local, enable it for Cloud (Neon)
	ssl: isLocal
		? false
		: {
				rejectUnauthorized: true,
			},
	// 3. Keep connection limits tight for serverless/cloud, higher for local
	max: isLocal ? 10 : 1,
});

const adapter = new PrismaPg(pool);

declare global {
	var prisma: PrismaClient | undefined;
}

// Ensure we don't create multiple instances in development (Next.js HMR)
export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}
