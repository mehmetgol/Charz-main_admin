import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'; // Prisma'yı ekledik
import { DashboardStats } from './types.js';

const prisma = new PrismaClient();
const app = express();
const PORT = 5000; // Portu 5000 olarak sabitledik

app.use(cors());
app.use(express.json());

// 1. İstatistikleri Çekme (Dinamik)
app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const vehicleCount = await prisma.vehicle.count();

        const stats: DashboardStats = {
            totalKwh: 12450,
            activeCars: vehicleCount, // Veritabanındaki gerçek sayı
            faultyUnits: 3,
            dailyEarning: 8200,
            lastUpdate: new Date().toISOString()
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Veriler alınamadı" });
    }
});

// 2. Tüm Araçları Listeleme
app.get('/api/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicles = await prisma.vehicle.findMany();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Araç listesi alınamadı" });
    }
});

// 3. Belirli bir aracın durumunu güncelleme (PATCH)
app.patch('/api/vehicles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { id: Number(id) },
            data: { status: status }
        });
        res.json(updatedVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Güncelleme yapılamadı." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend sunucusu http://localhost:${PORT} üzerinde çalışıyor`);
});