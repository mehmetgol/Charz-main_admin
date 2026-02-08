-- 1. TEST VERİSİ EKLEME (SEEDING)
-- Araç ekleme
INSERT INTO "Vehicle" (model, plate, battery, status, updatedAt)
VALUES ('Tesla Model 3', '34ABC123', 85, 'Şarjda', CURRENT_TIMESTAMP);

-- İstasyon ekleme
INSERT INTO "Station" (name, location, status, usedSockets, totalSockets)
VALUES ('Kadıköy Merkez', '40.99, 29.02', 'Aktif', 1, 4);

-- İstatistikleri başlatma
INSERT INTO "DashboardStats" (id, totalKwh, dailyEarning, faultyUnits)
VALUES (1, 150.5, 450.0, 0);

---

-- 2. İZLEME VE ANALİZ SORGULARI
-- Bataryası %20'nin altında olan araçları getir
SELECT * FROM "Vehicle" WHERE battery < 20;

-- Doluluk oranı %100 olan istasyonları bul
SELECT * FROM "Station" WHERE usedSockets >= totalSockets;

-- Toplam kazancı ve arızalı üniteleri kontrol et
SELECT totalKwh, dailyEarning FROM "DashboardStats" WHERE id = 1;

---

-- 3. GÜNCELLEME SORGULARI (DASHBOARD İÇİN)
-- Bir araç şarjdan çıktığında istasyondaki soket sayısını azalt
UPDATE "Station" SET usedSockets = usedSockets - 1 WHERE id = 1;

-- Günlük kazanca ekleme yap
UPDATE "DashboardStats" SET dailyEarning = dailyEarning + 100.0 WHERE id = 1;