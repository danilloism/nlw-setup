/*
  Warnings:

  - You are about to drop the column `dayId` on the `habits_days` table. All the data in the column will be lost.
  - You are about to drop the column `habitId` on the `habits_days` table. All the data in the column will be lost.
  - Added the required column `day_id` to the `habits_days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habit_id` to the `habits_days` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    CONSTRAINT "habits_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habits_days_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits_days" ("id") SELECT "id" FROM "habits_days";
DROP TABLE "habits_days";
ALTER TABLE "new_habits_days" RENAME TO "habits_days";
CREATE UNIQUE INDEX "habits_days_habit_id_day_id_key" ON "habits_days"("habit_id", "day_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
