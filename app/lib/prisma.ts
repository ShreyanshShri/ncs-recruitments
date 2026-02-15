import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const baseUrl = process.env.DATABASE_URL!;

// ✅ ensure future-proof SSL mode without editing Vercel env
const connectionString = baseUrl.includes("sslmode=")
	? baseUrl.replace(/sslmode=[^&]+/, "sslmode=verify-full")
	: baseUrl + "&sslmode=verify-full";

const pool = new Pool({
	connectionString,

	// ✅ required for Neon serverless
	ssl: {
		rejectUnauthorized: true,
	},

	// ✅ prevents hanging lambdas
	max: 1,
});

const adapter = new PrismaPg(pool);

declare global {
	var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}
