-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('GENERAL', 'PROJECT', 'CAREER', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "BudgetRange" AS ENUM ('UNDER_10K', 'UNDER_10K_50K', 'FIFTY_TO_HUNDRED_K', 'OVER_100K');

-- CreateEnum
CREATE TYPE "Timeline" AS ENUM ('IMMEDIATE', 'ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'SIX_MONTHS_PLUS');

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "inquiryType" "InquiryType" NOT NULL,
    "budget" "BudgetRange",
    "timeline" "Timeline",
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "attachments" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_userId_idx" ON "Contact"("userId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
