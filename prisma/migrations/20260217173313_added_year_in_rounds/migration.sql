/*
  Warnings:

  - Added the required column `year` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "RoundType" ADD VALUE 'RESUME';

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "year" "Year" NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "resumeUrl" TEXT;
