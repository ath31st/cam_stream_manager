-- CreateTable
CREATE TABLE "Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "streamUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "responsiblePerson" TEXT,
    "responsiblePhone" TEXT
);
