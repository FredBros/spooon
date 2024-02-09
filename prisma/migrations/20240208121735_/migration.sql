/*
  Warnings:

  - You are about to drop the column `ytChannelthumbnail` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "ytChannelthumbnail",
ADD COLUMN     "ytChannelThumbnail" TEXT;
