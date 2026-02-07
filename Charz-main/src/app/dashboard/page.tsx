'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

interface DashboardStats {
    totalKwh: number;
    activeCars: number;
    faultyUnits: number;
    dailyEarning: number;
    lastUpdate: string;
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalKwh: 0,
        activeCars: 0,
        faultyUnits: 0,
        dailyEarning: 0,
        lastUpdate: new Date().toISOString()
    });

    const [formattedTime, setFormattedTime] = useState<string>("");

    useEffect(() => {
        if (stats.lastUpdate) {
            setFormattedTime(new Date(stats.lastUpdate).toLocaleTimeString());
        }
    }, [stats.lastUpdate]);

    useEffect(() => {
        // API yolunu '/api/stats' yaparak kendi iç API'mize yönlendirdik
        const API_URL = '/api/stats';

        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
            })
            .catch((err) => {
                console.error("Veri çekilemedi:", err);
            });
    }, []);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={styles.navItem}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={styles.navItem}>🔌 İstasyon Durumu</Link>

                    {/* YENİ EKLENEN AYARLAR LİNKİ */}
                    <Link href="/dashboard/settings" className={styles.navItem}>⚙️ Ayarlar</Link>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Yönetim Paneli</h1>
                    <div>
                        <span>Son Güncelleme: <b>{formattedTime}</b></span>
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

                <div className={styles.placeholderBox}>
                    Grafikler ve Detaylı Veriler Yükleniyor...
                </div>
            </main>
        </div>
    );
}