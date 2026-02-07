import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ==========================================
// 1. DASHBOARD İSTATİSTİKLERİ
// ==========================================

app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const stats = await prisma.dashboardStats.findUnique({
            where: { id: 1 }
        });
        // Veritabanı boşsa varsayılan değerleri dön
        res.json(stats || {
            totalKwh: 0,
            activeCars: 0,
            faultyUnits: 0,
            dailyEarning: 0,
            lastUpdate: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: "İstatistikler çekilemedi" });
    }
});

app.post('/api/stats', async (req: Request, res: Response) => {
    try {
        const { totalKwh, activeCars, faultyUnits, dailyEarning } = req.body;

        const result = await prisma.dashboardStats.upsert({
            where: { id: 1 },
            update: {
                totalKwh: Number(totalKwh) || 0,
                activeCars: Number(activeCars) || 0,
                faultyUnits: Number(faultyUnits) || 0,
                dailyEarning: Number(dailyEarning) || 0,
                lastUpdate: new Date()
            },
            create: {
                id: 1,
                totalKwh: Number(totalKwh) || 0,
                activeCars: Number(activeCars) || 0,
                faultyUnits: Number(faultyUnits) || 0,
                dailyEarning: Number(dailyEarning) || 0,
                lastUpdate: new Date()
            }
        });
        res.json(result);
    } catch (error) {
        console.error("Stats Update Error:", error);
        res.status(500).json({ error: "Veritabanı güncellenemedi." });
    }
});

// ==========================================
// 2. ARAÇ YÖNETİMİ
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
            update: { model, plate, status, battery: Number(battery) || 0 },
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
// 3. İSTASYON YÖNETİMİ
// ==========================================

app.get('/api/stations', async (req: Request, res: Response) => {
    try {
        const stations = await prisma.station.findMany({ orderBy: { id: 'desc' } });
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: "İstasyonlar listelenemedi" });
    }
});

app.post('/api/stations/update', async (req: Request, res: Response) => {
    try {
        const { id, name, location, status, totalSockets, usedSockets } = req.body;
        const result = await prisma.station.upsert({
            where: { id: Number(id) || 0 },
            update: {
                name,
                location,
                status,
                totalSockets: Number(totalSockets) || 2,
                usedSockets: Number(usedSockets) || 0
            },
            create: {
                name,
                location,
                status: status || "Aktif",
                totalSockets: Number(totalSockets) || 2,
                usedSockets: Number(usedSockets) || 0
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "İstasyon kaydedilemedi" });
    }
});

app.delete('/api/stations/:id', async (req: Request, res: Response) => {
    try {
        await prisma.station.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "İstasyon silindi" });
    } catch (error) {
        res.status(500).json({ error: "Silme başarısız" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} portunda aktif.`);
});