-- AlterTable
ALTER TABLE `users` ADD COLUMN `email_verified_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `email_verification_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `tokenHash` VARCHAR(64) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `email_verification_tokens_tokenHash_key`(`tokenHash`),
    INDEX `email_verification_tokens_userId_idx`(`userId`),
    INDEX `email_verification_tokens_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `email_verification_tokens` ADD CONSTRAINT `email_verification_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
