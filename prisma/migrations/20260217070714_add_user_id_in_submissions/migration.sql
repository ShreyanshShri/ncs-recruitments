/*
  Warnings:

  - A unique constraint covering the columns `[userId,roundId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_applicationId_fkey";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "applicationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Submission_userId_roundId_key" ON "Submission"("userId", "roundId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
