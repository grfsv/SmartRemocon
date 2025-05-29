/*
  Warnings:

  - Added the required column `deviceId` to the `EnvironmentLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `IrSensorValue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EnvironmentLog` DROP FOREIGN KEY `EnvironmentLog_id_fkey`;

-- DropForeignKey
ALTER TABLE `IrSensorValue` DROP FOREIGN KEY `IrSensorValue_id_fkey`;

-- AlterTable
ALTER TABLE `EnvironmentLog` ADD COLUMN `deviceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `IrSensorValue` ADD COLUMN `deviceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `EnvironmentLog` ADD CONSTRAINT `EnvironmentLog_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IrSensorValue` ADD CONSTRAINT `IrSensorValue_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
