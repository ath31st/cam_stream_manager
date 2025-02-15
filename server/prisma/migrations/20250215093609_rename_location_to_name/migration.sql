-- Переименование столбца location в name
PRAGMA foreign_keys=off;

ALTER TABLE "Stream" RENAME COLUMN "location" TO "name";

PRAGMA foreign_keys=on;
