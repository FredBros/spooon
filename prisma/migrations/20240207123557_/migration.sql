/*
  Warnings:

  - Made the column `ytDescription` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "ytDescription" SET NOT NULL;
