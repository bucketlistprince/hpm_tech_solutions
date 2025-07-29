/*
  Warnings:

  - The values [MOBILE_APPLICATION,SOFTWARE_PURCHASE] on the enum `ProjectType` will be removed. If these variants are still used in the database, this will fail.
  - The values [IMMEDIATE,ONE_TO_THREE_MONTHS,THREE_TO_SIX_MONTHS,SIX_MONTHS_PLUS] on the enum `Timeline` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accessibility` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `actualHours` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `appStoreRequirements` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `businessPhone` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `clientPhone` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `cmsRequired` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `companyHistory` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `companyMotto` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `contentReady` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `dataProtection` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `databaseRequirements` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `deploymentEnvironment` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `developmentEnvironment` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `domainName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedHours` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `integrationRequirements` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `licenseType` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `logoStatus` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `maintenancePeriod` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `milestones` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `mobileFeatures` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `mobilePlatform` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `performanceRequirements` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `preferredFeatures` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `responsiveDesign` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `softwareName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `softwareType` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `specialFeatures` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `supportDuration` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `supportHours` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologyStack` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `testingEnvironment` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `websiteManagement` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `websiteType` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[websiteDetailsId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileAppDetailsId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customSoftwareDetailsId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purchaseSoftwareDetailsId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonEmail` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonPhone` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedTimeline` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenanceRequired` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContactMethod` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `deadline` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('EMAIL', 'PHONE', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectType_new" AS ENUM ('WEBSITE', 'MOBILE', 'CUSTOM_SOFTWARE', 'PURCHASE_SOFTWARE');
ALTER TABLE "Project" ALTER COLUMN "type" TYPE "ProjectType_new" USING ("type"::text::"ProjectType_new");
ALTER TYPE "ProjectType" RENAME TO "ProjectType_old";
ALTER TYPE "ProjectType_new" RENAME TO "ProjectType";
DROP TYPE "ProjectType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Timeline_new" AS ENUM ('ONE_MONTH', 'TWO_MONTHS', 'THREE_PLUS_MONTHS', 'CUSTOM');
ALTER TABLE "Project" ALTER COLUMN "expectedTimeline" TYPE "Timeline_new" USING ("expectedTimeline"::text::"Timeline_new");
ALTER TABLE "Contact" ALTER COLUMN "timeline" TYPE "Timeline_new" USING ("timeline"::text::"Timeline_new");
ALTER TYPE "Timeline" RENAME TO "Timeline_old";
ALTER TYPE "Timeline_new" RENAME TO "Timeline";
DROP TYPE "Timeline_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "accessibility",
DROP COLUMN "actualHours",
DROP COLUMN "address",
DROP COLUMN "appStoreRequirements",
DROP COLUMN "budget",
DROP COLUMN "businessPhone",
DROP COLUMN "clientId",
DROP COLUMN "clientName",
DROP COLUMN "clientPhone",
DROP COLUMN "cmsRequired",
DROP COLUMN "companyHistory",
DROP COLUMN "companyMotto",
DROP COLUMN "companyName",
DROP COLUMN "contentReady",
DROP COLUMN "dataProtection",
DROP COLUMN "databaseRequirements",
DROP COLUMN "deploymentEnvironment",
DROP COLUMN "developmentEnvironment",
DROP COLUMN "domainName",
DROP COLUMN "endDate",
DROP COLUMN "estimatedHours",
DROP COLUMN "integrationRequirements",
DROP COLUMN "licenseType",
DROP COLUMN "logoStatus",
DROP COLUMN "maintenancePeriod",
DROP COLUMN "milestones",
DROP COLUMN "mobileFeatures",
DROP COLUMN "mobilePlatform",
DROP COLUMN "notes",
DROP COLUMN "performanceRequirements",
DROP COLUMN "platform",
DROP COLUMN "preferredFeatures",
DROP COLUMN "priority",
DROP COLUMN "progress",
DROP COLUMN "responsiveDesign",
DROP COLUMN "softwareName",
DROP COLUMN "softwareType",
DROP COLUMN "specialFeatures",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "supportDuration",
DROP COLUMN "supportHours",
DROP COLUMN "technologyStack",
DROP COLUMN "testingEnvironment",
DROP COLUMN "timeline",
DROP COLUMN "title",
DROP COLUMN "websiteManagement",
DROP COLUMN "websiteType",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "competitorReferences" TEXT[],
ADD COLUMN     "contactPersonEmail" TEXT NOT NULL,
ADD COLUMN     "contactPersonName" TEXT NOT NULL,
ADD COLUMN     "contactPersonPhone" TEXT NOT NULL,
ADD COLUMN     "customSoftwareDetailsId" TEXT,
ADD COLUMN     "expectedTimeline" "Timeline" NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "keyFeatures" TEXT[],
ADD COLUMN     "maintenanceRequired" BOOLEAN NOT NULL,
ADD COLUMN     "mobileAppDetailsId" TEXT,
ADD COLUMN     "preferredContactMethod" "ContactMethod" NOT NULL,
ADD COLUMN     "projectName" TEXT NOT NULL,
ADD COLUMN     "purchaseSoftwareDetailsId" TEXT,
ADD COLUMN     "thirdPartyIntegrations" TEXT[],
ADD COLUMN     "websiteDetailsId" TEXT,
ALTER COLUMN "deadline" SET NOT NULL;

-- DropTable
DROP TABLE "File";

-- DropEnum
DROP TYPE "ProjectStatus";

-- CreateTable
CREATE TABLE "WebsiteDetails" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "colorPreferences" TEXT[],
    "hasLogo" BOOLEAN NOT NULL,
    "logoUrl" TEXT,
    "hasContent" BOOLEAN NOT NULL,
    "contentDetails" TEXT,
    "designStyle" TEXT,
    "layoutReferences" TEXT[],
    "preferredDomainNames" TEXT[],
    "seoRequired" BOOLEAN NOT NULL,

    CONSTRAINT "WebsiteDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileAppDetails" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "platformsNeeded" TEXT[],
    "pushNotificationsRequired" BOOLEAN NOT NULL,
    "offlineAccessNeeded" BOOLEAN NOT NULL,
    "appStoreDeployment" BOOLEAN NOT NULL,

    CONSTRAINT "MobileAppDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomSoftwareDetails" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "workflowDetails" TEXT,
    "integrationWithExistingSystems" TEXT,
    "rolesAndPermissionsRequired" BOOLEAN NOT NULL,
    "reportingAndAnalyticsNeeded" BOOLEAN NOT NULL,

    CONSTRAINT "CustomSoftwareDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseSoftwareDetails" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "productId" TEXT,
    "customizationNeeded" BOOLEAN NOT NULL,
    "customFeatureRequests" TEXT[],
    "licenseType" TEXT,
    "demoRequested" BOOLEAN NOT NULL,
    "trainingRequired" BOOLEAN NOT NULL,

    CONSTRAINT "PurchaseSoftwareDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteDetails_projectId_key" ON "WebsiteDetails"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileAppDetails_projectId_key" ON "MobileAppDetails"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSoftwareDetails_projectId_key" ON "CustomSoftwareDetails"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseSoftwareDetails_projectId_key" ON "PurchaseSoftwareDetails"("projectId");

-- CreateIndex
CREATE INDEX "Invoice_projectId_idx" ON "Invoice"("projectId");

-- CreateIndex
CREATE INDEX "Invoice_userId_idx" ON "Invoice"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_websiteDetailsId_key" ON "Project"("websiteDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_mobileAppDetailsId_key" ON "Project"("mobileAppDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_customSoftwareDetailsId_key" ON "Project"("customSoftwareDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_purchaseSoftwareDetailsId_key" ON "Project"("purchaseSoftwareDetailsId");

-- AddForeignKey
ALTER TABLE "WebsiteDetails" ADD CONSTRAINT "WebsiteDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileAppDetails" ADD CONSTRAINT "MobileAppDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSoftwareDetails" ADD CONSTRAINT "CustomSoftwareDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseSoftwareDetails" ADD CONSTRAINT "PurchaseSoftwareDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
