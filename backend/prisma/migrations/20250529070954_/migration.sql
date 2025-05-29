/*
  Warnings:

  - You are about to alter the column `collection_metrics` on the `Device` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Device` MODIFY `collection_metrics` BOOLEAN NOT NULL;
