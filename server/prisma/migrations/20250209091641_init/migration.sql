-- CreateTable
CREATE TABLE "_GroupToRegion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GroupToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Region" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToRegion_AB_unique" ON "_GroupToRegion"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToRegion_B_index" ON "_GroupToRegion"("B");
