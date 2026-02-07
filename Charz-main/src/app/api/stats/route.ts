import { NextResponse } from 'next/server';

// Bu dosya GET isteği aldığında Dashboard'a başlangıç verilerini gönderir.
export async function GET() {
    try {
        const stats = {
            totalKwh: 12450,
            activeCars: 12,
            faultyUnits: 1,
            dailyEarning: 4500,
            lastUpdate: new Date().toISOString()
        };

        // Veriyi JSON formatında döndür
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json(
            { error: "Veriler alınırken bir hata oluştu" },
            { status: 500 }
        );
    }
}

// İleride Ayarlar sayfasından veri göndermek istersen bu POST metodunu kullanabilirsin
export async function POST(request: Request) {
    const body = await request.json();

    // Şimdilik gelen veriyi konsola yazar ve başarılı döner
    console.log("Yeni İstatistikler Alındı:", body);

    return NextResponse.json({ message: "Veri başarıyla güncellendi", data: body });
}