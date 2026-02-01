'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import en yukarıda olmalı
import styles from './dashboard.module.css';

interface DashboardStats {
    totalKwh: number;
    activeCars: number;
    faultyUnits: number;
    dailyEarning: number;
    lastUpdate: string;
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        // Port numaran 5000 ise burayı 5000 yapmalısın
        fetch('http://localhost:5001/api/stats')
            .then((res) => res.json())
            .then((data: DashboardStats) => setStats(data))
            .catch((err) => console.error("Veri çekme hatası:", err));
    }, []);

    if (!stats) return <div className={styles.loading}>Veriler yükleniyor...</div>;

    return (
        <div className={styles.container}>
            {/* Yan Menü */}
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={styles.navItem}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={styles.navItem}>🔌 İstasyon Durumu</Link>
                    <Link href="/dashboard/settings" className={styles.navItem}>⚙️ Ayarlar</Link>
                </nav>
            </aside>

            {/* Sağ Taraf İçerik */}
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
                <div style={{ marginTop: '32px', background: '#e2e8f0', height: '300px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#64748b', border: '2px dashed #cbd5e1' }}>
                    Grafikler ve Detaylı Araç Listesi Yakında...
                </div>
            </main>
        </div>
    );
}