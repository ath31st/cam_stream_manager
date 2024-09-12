-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ResponsiblePerson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "streamUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT,
    "responsiblePerson" TEXT,
    "responsiblePhone" TEXT,
    "regionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stream_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ResponsiblePersonToStream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ResponsiblePersonToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "ResponsiblePerson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResponsiblePersonToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResponsiblePersonToStream_AB_unique" ON "_ResponsiblePersonToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ResponsiblePersonToStream_B_index" ON "_ResponsiblePersonToStream"("B");
