-- CreateTable
CREATE TABLE "Advancement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizStep" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Advancement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Advancement_userId_key" ON "Advancement"("userId");
