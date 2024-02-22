-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_ytChannelId_fkey" FOREIGN KEY ("ytChannelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
