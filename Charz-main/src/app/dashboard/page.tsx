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

    // PORT 5000 AYARI BURADA
    const API_URL = 'http://localhost:5000/api/stats';

    useEffect(() => {
        // 1. Önce veriyi Backend'den (5000 portu) çekmeyi dene
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Backend'e ulaşılamadı");
                return res.json();
            })
            .then((data) => {
                setStats(data);
                localStorage.setItem('dashboard_data', JSON.stringify(data));
            })
            .catch((err) => {
                console.error("Backend hatası, yerel hafıza kontrol ediliyor:", err);
                // Backend çalışmıyorsa yerel hafızadan kurtar
                const savedStats = localStorage.getItem('dashboard_data');
                if (savedStats) {
                    setStats(JSON.parse(savedStats));
                }
            });
    }, []);

    // İstatistikler değiştikçe (özellikle manuel güncellemelerde) kaydet
    useEffect(() => {
        if (stats.totalKwh !== 0) {
            localStorage.setItem('dashboard_data', JSON.stringify(stats));
        }
    }, [stats]);

    useEffect(() => {
        if (stats.lastUpdate) {
            setFormattedTime(new Date(stats.lastUpdate).toLocaleTimeString());
        }
    }, [stats.lastUpdate]);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={styles.navItem}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={styles.navItem}>🔌 İstasyon Durumu</Link>
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