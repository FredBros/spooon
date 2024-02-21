/*
  Warnings:

  - Made the column `ytChannelId` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ytChannelTitle` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ytThumbnail` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ytPublishedAt` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ytChannelThumbnail` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "ytChannelId" SET NOT NULL,
ALTER COLUMN "ytChannelTitle" SET NOT NULL,
ALTER COLUMN "ytThumbnail" SET NOT NULL,
ALTER COLUMN "ytPublishedAt" SET NOT NULL,
ALTER COLUMN "ytChannelThumbnail" SET NOT NULL;
