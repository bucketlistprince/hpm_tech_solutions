-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('MOBILE_APPLICATION', 'WEBSITE', 'CUSTOM_SOFTWARE', 'SOFTWARE_PURCHASE');

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
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
