-- CreateEnum
CREATE TYPE "Department" AS ENUM ('TECHNICAL', 'SALES_N_MARKETING', 'ADMIN_OR_OPERATIONS');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ADMIN_ASSISTANT', 'PURCHASING_OFFICER', 'JUNIOR_SALES_ASSOCIATE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'HR', 'USER', 'EMPLOYEE', 'GUEST');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('CEBU');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'RESIGNED', 'TERMINATED', 'AWOL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST',
ADD COLUMN     "suffixName" TEXT;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "department" "Department" NOT NULL,
    "position" "Position" NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_employeeNumber_key" ON "Profile"("employeeNumber");
