-- CreateTable
CREATE TABLE `collaborator_invites` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `tokenHash` VARCHAR(64) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `role` ENUM('USER', 'COLLABORATOR', 'ADMIN') NOT NULL DEFAULT 'COLLABORATOR',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `collaborator_invites_tokenHash_key`(`tokenHash`),
    INDEX `collaborator_invites_email_idx`(`email`),
    INDEX `collaborator_invites_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
