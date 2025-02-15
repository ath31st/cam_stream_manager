/*
  Warnings:

  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToRegion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `regionId` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `playlistId` to the `Stream` table without a default value. This is not possible if the table is not empty.
*/

-- Создание таблицы Playlist
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Создание таблицы _GroupToPlaylist
CREATE TABLE "_GroupToPlaylist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GroupToPlaylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupToPlaylist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Создание новой таблицы Stream с нужными изменениями
CREATE TABLE "new_Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "streamUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT,
    "playlistId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stream_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Копирование данных из Region в Playlist
INSERT INTO Playlist (id, name, isVisible, createdAt, updatedAt)
SELECT id, name, isVisible, createdAt, updatedAt FROM Region;

-- Копирование данных из Stream в новую таблицу new_Stream
INSERT INTO "new_Stream" ("id", "location", "isVisible", "streamUrl", "status", "comment", "playlistId", "createdAt", "updatedAt")
SELECT "id", "location", "isVisible", "streamUrl", "status", "comment", "regionId" AS "playlistId", "createdAt", "updatedAt" FROM "Stream";

-- Удаление старой таблицы Region
PRAGMA foreign_keys=off;
DROP TABLE "Region";
PRAGMA foreign_keys=on;

-- Удаление старой таблицы _GroupToRegion
PRAGMA foreign_keys=off;
DROP TABLE "_GroupToRegion";
PRAGMA foreign_keys=on;

-- Удаление старой таблицы Stream
PRAGMA foreign_keys=off;
DROP TABLE "Stream";
PRAGMA foreign_keys=on;

-- Переименование новой таблицы new_Stream в Stream
ALTER TABLE "new_Stream" RENAME TO "Stream";

-- Создание индексов для новой таблицы _GroupToPlaylist
CREATE UNIQUE INDEX "_GroupToPlaylist_AB_unique" ON "_GroupToPlaylist"("A", "B");
CREATE INDEX "_GroupToPlaylist_B_index" ON "_GroupToPlaylist"("B");
