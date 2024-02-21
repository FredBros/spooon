/*
  Warnings:

  - You are about to drop the column `userId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `ytChannelId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `ytChannelThumbnail` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `ytChannelTitle` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `ytDescription` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "userId",
DROP COLUMN "ytChannelId",
DROP COLUMN "ytChannelThumbnail",
DROP COLUMN "ytChannelTitle",
DROP COLUMN "ytDescription";
