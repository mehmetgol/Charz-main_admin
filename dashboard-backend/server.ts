import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// 1. Prisma Client Yapılandırması
// En güvenli yol: Hiçbir parametre vermemek. Prisma otomatik olarak .env dosyasını okur.
const prisma = new PrismaClient();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// 2. Middleware Ayarları
app.use(cors());
app.use(express.json());

/** * 3. API Rotaları
 */

// Dashboard İstatistikleri
app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const vehicleCount = await prisma.vehicle.count();
        res.json({
            totalKwh: 12450.5,
            activeCars: vehicleCount,
            faultyUnits: 3,
            dailyEarning: 8200,
            lastUpdate: new Date().toISOString()
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ error: "İstatistikler alınamadı." });
    }
});

// Araç Listesi
app.get('/api/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { id: 'desc' }
        });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Araç listesi alınamadı." });
    }
});

// Yeni Araç Ekleme
app.post('/api/vehicles', async (req: Request, res: Response) => {
    const { model, plate, status } = req.body;
    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                model,
                plate,
                status: status || "Beklemede",
                battery: 0
            }
        });
        res.status(201).json(newVehicle);
    } catch (error) {
        console.error("Ekleme Hatası:", error);
        res.status(500).json({ error: "Araç eklenemedi." });
    }
});

// Araç Durumu Güncelleme
app.patch('/api/vehicles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updated = await prisma.vehicle.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Güncelleme başarısız." });
    }
});

// Araç Silme
app.delete('/api/vehicles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.vehicle.delete({ where: { id: Number(id) } });
        res.json({ message: "Başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Silme başarısız." });
    }
});

// 4. Sunucuyu Başlatma
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🚀 TOGG CHARZ BACKEND ÇALIŞIYOR!
    ---------------------------
    📍 Adres: http://localhost:${PORT}
    ---------------------------
    `);
});