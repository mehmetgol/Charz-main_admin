import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// ÖNEMLİ: Frontend (Next.js) bağlantısı için CORS şart
app.use(cors());
app.use(express.json());

// ==========================================
// 1. DASHBOARD İSTATİSTİKLERİ (GET & POST)
// ==========================================

// İstatistikleri Getir
app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const stats = await prisma.dashboardStats.findUnique({
            where: { id: 1 }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "İstatistikler çekilemedi" });
    }
});

// İstatistikleri Güncelle
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
        res.status(500).json({ error: "Veritabanı güncellenemedi (ID:1 kayıtlı olmayabilir)" });
    }
});

// ==========================================
// 2. ARAÇ YÖNETİMİ (GET, UPSERT & DELETE)
// ==========================================

// Tüm Araçları Getir (URL: /api/vehicles)
app.get('/api/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { id: 'desc' }
        });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Araç listesi çekilemedi" });
    }
});

// Araç Ekle veya Güncelle
app.post('/api/vehicles/update', async (req: Request, res: Response) => {
    try {
        const { id, model, plate, status, battery } = req.body;

        const result = await prisma.vehicle.upsert({
            where: { id: Number(id) || 0 },
            update: {
                model,
                plate,
                status,
                battery: Number(battery)
            },
            create: {
                model,
                plate,
                status,
                battery: Number(battery) || 0
            }
        });
        res.json(result);
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ error: "Araç kaydedilemedi. Plaka zaten mevcut olabilir." });
    }
});

// Araç Sil
app.delete('/api/vehicles/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.vehicle.delete({
            where: { id: Number(id) }
        });
        res.json({ message: "Araç silindi" });
    } catch (error) {
        res.status(500).json({ error: "Silme işlemi başarısız" });
    }
});

// ==========================================
// 3. İSTASYONLAR (GET)
// ==========================================

app.get('/api/stations', async (req: Request, res: Response) => {
    try {
        const stations = await prisma.station.findMany();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: "İstasyon verisi çekilemedi" });
    }
});

// ==========================================
// SUNUCU BAŞLATMA
// ==========================================

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`
🚀 BACKEND SUNUCUSU ÇALIŞIYOR!
---------------------------------------
📡 Port: ${PORT}
🔗 Araçlar API: http://localhost:${PORT}/api/vehicles
📊 İstatistik API: http://localhost:${PORT}/api/stats
---------------------------------------
    `);
});