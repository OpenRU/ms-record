-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "period" TEXT NOT NULL
);
