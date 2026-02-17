/*
  Warnings:

  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'INPUT');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" "QuestionType" NOT NULL,
ALTER COLUMN "options" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "markingScheme" JSONB,
ADD COLUMN     "startTime" TIMESTAMP(3);
