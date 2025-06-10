/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnvironmentLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IrSensorValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EnvironmentLog` DROP FOREIGN KEY `EnvironmentLog_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `IrSensorValue` DROP FOREIGN KEY `IrSensorValue_deviceId_fkey`;

-- DropTable
DROP TABLE `Device`;

-- DropTable
DROP TABLE `EnvironmentLog`;

-- DropTable
DROP TABLE `IrSensorValue`;

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mac_address` VARCHAR(255) NOT NULL,
    `ip_address` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `location` TEXT NULL,
    `collection_metrics` BOOLEAN NOT NULL DEFAULT false,
    `registered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `devices_mac_address_key`(`mac_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `env_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` INTEGER NOT NULL,
    `temperature_sht` DOUBLE NOT NULL,
    `humidity` DOUBLE NOT NULL,
    `temperature_qmp` DOUBLE NOT NULL,
    `pressure` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ir_sensor_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `env_logs` ADD CONSTRAINT `env_logs_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ir_sensor_values` ADD CONSTRAINT `ir_sensor_values_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
