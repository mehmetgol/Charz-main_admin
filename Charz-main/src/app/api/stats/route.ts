import { NextResponse } from 'next/server';

export async function GET() {
    // Burada normalde veritabanından veri çekilir
    // Şimdilik test verisi dönüyoruz
    const stats = {
        totalKwh: 12450,
        activeCars: 12,
        faultyUnits: 1,
        dailyEarning: 4500,
        lastUpdate: new Date().toISOString()
    };

    return NextResponse.json(stats);
}