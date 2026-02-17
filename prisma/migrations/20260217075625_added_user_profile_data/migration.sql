-- CreateEnum
CREATE TYPE "Institution" AS ENUM ('AKTU', 'JSSUNI');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'CSE_AIML', 'CSE_DS', 'IT', 'ECE', 'MECHANICAL', 'RAI', 'EEE', 'EE', 'CIVIL');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "institution" "Institution" NOT NULL,
    "year" "Year" NOT NULL,
    "branch" "Branch" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_mobile_key" ON "UserProfile"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_rollNumber_institution_key" ON "UserProfile"("rollNumber", "institution");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
