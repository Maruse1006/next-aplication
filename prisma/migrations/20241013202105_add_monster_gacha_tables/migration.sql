-- CreateTable
CREATE TABLE `Monster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `rarity` ENUM('N', 'SR', 'SSR') NOT NULL,
    `stocks` INTEGER NOT NULL DEFAULT 0,
    `season` VARCHAR(6) NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMonster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `monsterId` INTEGER NOT NULL,
    `possessions` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMonster` ADD CONSTRAINT `UserMonster_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMonster` ADD CONSTRAINT `UserMonster_monsterId_fkey` FOREIGN KEY (`monsterId`) REFERENCES `Monster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
