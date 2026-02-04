'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

// 1. Veri yapısını tanımlıyoruz
interface DashboardStats {
    totalKwh: number;
    activeCars: number;
    faultyUnits: number;
    dailyEarning: number;
    lastUpdate: string;
}

export default function Dashboard() {
    // 2. DEĞİŞİKLİK BURADA: State'e varsayılan (başlangıç) değerleri veriyoruz.
    // Böylece 'stats' asla null olmayacak ve yükleme ekranında takılmayacak.
    const [stats, setStats] = useState<DashboardStats>({
        totalKwh: 0,
        activeCars: 0,
        faultyUnits: 0,
        dailyEarning: 0,
        lastUpdate: new Date().toISOString()
    });

    useEffect(() => {
        // API adresini buraya yazıyoruz
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        fetch(`${API_URL}/api/stats`)
            .then((res) => res.json())
            .then((data) => {
                // Veri geldiyse state'i güncelle
                setStats(data);
            })
            .catch((err) => {
                console.error("Veri çekilemedi, varsayılanlar kullanılıyor:", err);
            });
    }, []);

    // 3. DEĞİŞİKLİK BURADA: Artık "if (!stats) return..." satırını sildik!
    // Sayfa anında açılacak, veriler gelince 0'lar güncellenecek.

    return (
        <div className={styles.container}>
            {/* ... Yan Menü Kodların Aynı Kalacak ... */}
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={styles.navItem}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={styles.navItem}>🔌 İstasyon Durumu</Link>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Yönetim Paneli</h1>
                    <div>
                        <span>Son Güncelleme: <b>{new Date(stats.lastUpdate).toLocaleTimeString()}</b></span>
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <h3>Toplam Enerji</h3>
                        <p>{stats.totalKwh.toLocaleString()} kWh</p>
                    </div>

                    <div className={styles.card}>
                        <h3>Aktif Araçlar</h3>
                        <p>{stats.activeCars}</p>
                    </div>

                    <div className={styles.card} style={{ borderBottomColor: '#ef4444' }}>
                        <h3>Arızalı Üniteler</h3>
                        <p style={{ color: '#ef4444' }}>{stats.faultyUnits}</p>
                    </div>

                    <div className={styles.card}>
                        <h3>Günlük Kazanç</h3>
                        <p>₺{stats.dailyEarning.toLocaleString()}</p>
                    </div>
                </div>

                {/* Alt Kısım */}
                <div className={styles.placeholderBox}>
                    Grafikler ve Detaylı Veriler Yükleniyor...
                </div>
            </main>
        </div>
    );
}