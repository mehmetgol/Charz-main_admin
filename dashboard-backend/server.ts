import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware Ayarları
app.use(cors());
app.use(express.json());

// ==========================================
// 1. DASHBOARD İSTATİSTİKLERİ
// ==========================================

// İstatistikleri Getir
app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const stats = await prisma.dashboardStats.findUnique({ where: { id: 1 } });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "İstatistikler çekilemedi" });
    }
});

// İstatistikleri Güncelle (Admin Paneli İçin)
app.post('/api/stats', async (req: Request, res: Response) => {
    try {
        const { totalKwh, dailyEarning, faultyUnits } = req.body;
        const updated = await prisma.dashboardStats.update({
            where: { id: 1 },
            data: {
                totalKwh: Number(totalKwh),
                dailyEarning: Number(dailyEarning),
                faultyUnits: Number(faultyUnits)
            },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Güncelleme başarısız" });
    }
});

// ==========================================
// 2. ARAÇ YÖNETİMİ (Vehicles)
// ==========================================

app.get('/api/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicles = await prisma.vehicle.findMany({ orderBy: { id: 'desc' } });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Araçlar listelenemedi" });
    }
});

app.post('/api/vehicles/update', async (req: Request, res: Response) => {
    try {
        const { id, model, plate, status, battery } = req.body;
        const result = await prisma.vehicle.upsert({
            where: { id: Number(id) || 0 },
            update: { model, plate, status, battery: Number(battery) },
            create: { model, plate, status, battery: Number(battery) || 0 }
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Araç kaydedilemedi" });
    }
});

app.delete('/api/vehicles/:id', async (req: Request, res: Response) => {
    try {
        await prisma.vehicle.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "Araç silindi" });
    } catch (error) {
        res.status(500).json({ error: "Silme başarısız" });
    }
});

// ==========================================
// 3. İSTASYON YÖNETİMİ (Stations) - BUTONLARI ÇALIŞTIRAN KISIM
// ==========================================

// İstasyonları Listele
app.get('/api/stations', async (req: Request, res: Response) => {
    try {
        const stations = await prisma.station.findMany({ orderBy: { id: 'desc' } });
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: "İstasyonlar çekilemedi" });
    }
});

// İstasyon Ekle veya Güncelle (Upsert)
app.post('/api/stations/update', async (req: Request, res: Response) => {
    try {
        const { id, name, location, status, totalSockets, usedSockets } = req.body;

        // Gelen verileri sayıya çevirerek Prisma hatalarını önle
        const stationId = Number(id) || 0;

        const result = await prisma.station.upsert({
            where: { id: stationId },
            update: {
                name: String(name),
                location: String(location),
                status: String(status),
                totalSockets: Number(totalSockets),
                usedSockets: Number(usedSockets || 0)
            },
            create: {
                name: String(name),
                location: String(location),
                status: String(status || "Aktif"),
                totalSockets: Number(totalSockets) || 2,
                usedSockets: Number(usedSockets || 0)
            }
        });

        console.log(`✅ İstasyon İşlemi Başarılı: ${result.name} (ID: ${result.id})`);
        res.json(result);
    } catch (error: any) {
        console.error("❌ İstasyon Kayıt Hatası:", error.message);
        res.status(500).json({ error: "İstasyon veritabanına işlenemedi" });
    }
});

// İstasyon Sil
app.delete('/api/stations/:id', async (req: Request, res: Response) => {
    try {
        const stationId = Number(req.params.id);

        if (!stationId) return res.status(400).json({ error: "Geçersiz ID" });

        await prisma.station.delete({ where: { id: stationId } });

        console.log(`🗑️ İstasyon Silindi: ID ${stationId}`);
        res.json({ message: "Başarıyla silindi" });
    } catch (error: any) {
        console.error("❌ Silme Hatası:", error.message);
        res.status(500).json({ error: "Silme işlemi veritabanında başarısız oldu" });
    }
});

// Sunucuyu Başlat
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`
🚀 CHARZ BACKEND AKTİF!
---------------------------------------
📡 Port: ${PORT}
🔗 İstatistikler: http://localhost:${PORT}/api/stats
🔌 İstasyonlar: http://localhost:${PORT}/api/stations
🚗 Araçlar: http://localhost:${PORT}/api/vehicles
---------------------------------------
    `);
});