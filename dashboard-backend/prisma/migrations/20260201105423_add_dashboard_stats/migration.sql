-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "battery" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Beklemede',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "usedSockets" INTEGER NOT NULL DEFAULT 0,
    "totalSockets" INTEGER NOT NULL DEFAULT 2
);

-- CreateTable
CREATE TABLE "DashboardStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "totalKwh" REAL NOT NULL DEFAULT 0.0,
    "dailyEarning" REAL NOT NULL DEFAULT 0.0,
    "faultyUnits" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");
