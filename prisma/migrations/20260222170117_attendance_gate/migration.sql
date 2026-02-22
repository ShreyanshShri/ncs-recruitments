-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "attendanceAllowed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "attendanceMarkedAt" TIMESTAMP(3),
ADD COLUMN     "attendanceMarkedBy" TEXT;
