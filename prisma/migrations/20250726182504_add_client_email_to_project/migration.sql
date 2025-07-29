-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('WEBSITE', 'MOBILE', 'CUSTOM_SOFTWARE', 'PURCHASE_SOFTWARE');

-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('EMAIL', 'PHONE', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "Timeline" AS ENUM ('IMMEDIATE', 'ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'SIX_MONTHS_PLUS');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('GENERAL', 'PROJECT', 'CAREER', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "BudgetRange" AS ENUM ('UNDER_10K', 'UNDER_10K_50K', 'FIFTY_TO_HUNDRED_K', 'OVER_100K');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING',
    "budget" INTEGER,
    "timeline" TEXT,
    "preferredFeatures" TEXT,
    "platform" TEXT,
    "technologyStack" TEXT,
    "mobilePlatform" TEXT,
    "mobileFeatures" TEXT,
    "appStoreRequirements" TEXT,
    "websiteType" TEXT,
    "responsiveDesign" BOOLEAN,
    "cmsRequired" BOOLEAN,
    "companyName" TEXT,
    "companyMotto" TEXT,
    "companyHistory" TEXT,
    "domainName" TEXT,
    "specialFeatures" TEXT,
    "contentReady" BOOLEAN,
    "websiteManagement" BOOLEAN,
    "logoStatus" TEXT,
    "clientName" TEXT,
    "clientEmail" TEXT,
    "clientPhone" TEXT,
    "businessPhone" TEXT,
    "address" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "estimatedHours" INTEGER,
    "actualHours" INTEGER,
    "progress" INTEGER,
    "milestones" TEXT,
    "developmentEnvironment" TEXT,
    "testingEnvironment" TEXT,
    "deploymentEnvironment" TEXT,
    "supportDuration" INTEGER,
    "supportHours" TEXT,
    "maintenancePeriod" INTEGER,
    "dataProtection" BOOLEAN,
    "accessibility" BOOLEAN,
    "performanceRequirements" TEXT,
    "softwareType" TEXT,
    "integrationRequirements" TEXT,
    "databaseRequirements" TEXT,
    "softwareName" TEXT,
    "licenseType" TEXT,
    "deadline" TIMESTAMP(3),
    "priority" INTEGER,
    "notes" TEXT,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Contact_userId_idx" ON "Contact"("userId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
