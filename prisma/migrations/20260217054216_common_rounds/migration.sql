/*
  Warnings:

  - Added the required column `scope` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoundScope" AS ENUM ('COMMON', 'DOMAIN');

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "scope" "RoundScope" NOT NULL,
ALTER COLUMN "domain" DROP NOT NULL;
