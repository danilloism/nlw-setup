/*
  Warnings:

  - You are about to drop the column `day_id` on the `habits_days` table. All the data in the column will be lost.
  - You are about to drop the column `habit_id` on the `habits_days` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `habits_days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitId` to the `habits_days` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "days_date_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habitId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    CONSTRAINT "habits_days_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habits_days_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits_days" ("id") SELECT "id" FROM "habits_days";
DROP TABLE "habits_days";
ALTER TABLE "new_habits_days" RENAME TO "habits_days";
CREATE UNIQUE INDEX "habits_days_habitId_dayId_key" ON "habits_days"("habitId", "dayId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "days_date_idx" ON "days"("date");
