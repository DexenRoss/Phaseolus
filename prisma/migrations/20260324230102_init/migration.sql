-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'COLLABORATOR', 'USER') NOT NULL DEFAULT 'USER',
    `status` ENUM('ACTIVE', 'INVITED', 'DISABLED', 'PENDING_VERIFICATION') NOT NULL DEFAULT 'PENDING_VERIFICATION',
    `emailVerifiedAt` DATETIME(3) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitation` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'COLLABORATOR', 'USER') NOT NULL DEFAULT 'COLLABORATOR',
    `token` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED') NOT NULL DEFAULT 'PENDING',
    `expiresAt` DATETIME(3) NOT NULL,
    `acceptedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `invitedById` VARCHAR(191) NOT NULL,
    `acceptedById` VARCHAR(191) NULL,

    UNIQUE INDEX `Invitation_token_key`(`token`),
    INDEX `Invitation_email_idx`(`email`),
    INDEX `Invitation_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailVerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailVerificationToken_token_key`(`token`),
    INDEX `EmailVerificationToken_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `abstract` TEXT NULL,
    `journal` VARCHAR(191) NULL,
    `doi` VARCHAR(191) NULL,
    `publicationDate` DATETIME(3) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Publication_slug_key`(`slug`),
    UNIQUE INDEX `Publication_doi_key`(`doi`),
    INDEX `Publication_title_idx`(`title`),
    INDEX `Publication_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `orcid` VARCHAR(191) NULL,
    `affiliation` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Author_orcid_key`(`orcid`),
    INDEX `Author_fullName_idx`(`fullName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublicationAuthor` (
    `id` VARCHAR(191) NOT NULL,
    `publicationId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `authorOrder` INTEGER NOT NULL,
    `isCorresponding` BOOLEAN NOT NULL DEFAULT false,

    INDEX `PublicationAuthor_authorId_idx`(`authorId`),
    UNIQUE INDEX `PublicationAuthor_publicationId_authorId_key`(`publicationId`, `authorId`),
    UNIQUE INDEX `PublicationAuthor_publicationId_authorOrder_key`(`publicationId`, `authorOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetadataRecord` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` VARCHAR(191) NOT NULL,
    `publicationId` VARCHAR(191) NULL,
    `datasetId` VARCHAR(191) NULL,

    INDEX `MetadataRecord_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `MetadataRecord_key_idx`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dataset` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `sourceType` VARCHAR(191) NULL,
    `filePath` VARCHAR(191) NULL,
    `storageProvider` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'READY', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` VARCHAR(191) NOT NULL,
    `publicationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Dataset_slug_key`(`slug`),
    INDEX `Dataset_name_idx`(`name`),
    INDEX `Dataset_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'INVITE_SENT', 'INVITE_ACCEPTED', 'ROLE_CHANGED') NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actorId` VARCHAR(191) NULL,

    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_invitedById_fkey` FOREIGN KEY (`invitedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_acceptedById_fkey` FOREIGN KEY (`acceptedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationAuthor` ADD CONSTRAINT `PublicationAuthor_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationAuthor` ADD CONSTRAINT `PublicationAuthor_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetadataRecord` ADD CONSTRAINT `MetadataRecord_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetadataRecord` ADD CONSTRAINT `MetadataRecord_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetadataRecord` ADD CONSTRAINT `MetadataRecord_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dataset` ADD CONSTRAINT `Dataset_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dataset` ADD CONSTRAINT `Dataset_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
