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
    const API_URL = 'http://127.0.0.1:5000/api/stats';

    // Verileri çekme fonksiyonu
    const fetchStats = async () => {
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                if (data) setStats(data);
            }
        } catch (err) {
            console.error("Veri çekilemedi:", err);
            const savedStats = localStorage.getItem('dashboard_data');
            if (savedStats) setStats(JSON.parse(savedStats));
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // VERİTABANINI GÜNCELLEME FONKSİYONU
    const updateStat = async (field: keyof DashboardStats, amount: number) => {
        const newStats = {
            ...stats,
            [field]: Math.max(0, (stats[field] as number) + amount), // Negatif değer olmasını engeller
            lastUpdate: new Date().toISOString()
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStats)
            });

            if (res.ok) {
                setStats(newStats);
                localStorage.setItem('dashboard_data', JSON.stringify(newStats));
            }
        } catch (err) {
            console.error("Güncelleme hatası:", err);
            alert("Sunucuya ulaşılamadı, değişiklik kaydedilemedi.");
        }
    };

    useEffect(() => {
        if (stats?.lastUpdate) {
            setFormattedTime(new Date(stats.lastUpdate).toLocaleTimeString());
        }
    }, [stats?.lastUpdate]);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={styles.navItem}>🔌 İstasyonlar</Link>
                    <Link href="/dashboard/settings" className={styles.navItem}>⚙️ Ayarlar</Link>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Yönetim Paneli</h1>
                    <div>
                        <span>Son Güncelleme: <b>{formattedTime || "--:--"}</b></span>
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    {/* TOPLAM ENERJİ */}
                    <div className={styles.card}>
                        <h3>Toplam Enerji</h3>
                        <p>{stats.totalKwh?.toLocaleString() ?? 0} <small>kWh</small></p>
                        <div className={styles.btnGroup}>
                            <button onClick={() => updateStat('totalKwh', -100)}>-</button>
                            <button onClick={() => updateStat('totalKwh', 100)}>+</button>
                        </div>
                    </div>

                    {/* AKTİF ARAÇLAR */}
                    <div className={styles.card}>
                        <h3>Aktif Araçlar</h3>
                        <p>{stats.activeCars ?? 0}</p>
                        <div className={styles.btnGroup}>
                            <button onClick={() => updateStat('activeCars', -1)}>-</button>
                            <button onClick={() => updateStat('activeCars', 1)}>+</button>
                        </div>
                    </div>

                    {/* ARIZALI ÜNİTELER */}
                    <div className={styles.card} style={{ borderBottomColor: stats.faultyUnits > 0 ? '#ef4444' : '#22c55e' }}>
                        <h3>Arızalı Üniteler</h3>
                        <p style={{ color: stats.faultyUnits > 0 ? '#ef4444' : '#22c55e' }}>
                            {stats.faultyUnits ?? 0}
                        </p>
                        <div className={styles.btnGroup}>
                            <button onClick={() => updateStat('faultyUnits', -1)}>-</button>
                            <button onClick={() => updateStat('faultyUnits', 1)}>+</button>
                        </div>
                    </div>

                    {/* GÜNLÜK KAZANÇ */}
                    <div className={styles.card}>
                        <h3>Günlük Kazanç</h3>
                        <p>₺{stats.dailyEarning?.toLocaleString() ?? 0}</p>
                        <div className={styles.btnGroup}>
                            <button onClick={() => updateStat('dailyEarning', -50)}>-</button>
                            <button onClick={() => updateStat('dailyEarning', 50)}>+</button>
                        </div>
                    </div>
                </div>

                <div className={styles.placeholderBox}>
                    {stats.totalKwh === 0 ? "⚠️ Sunucu kapalı (Port 5000)." : "✅ Veritabanı Aktif."}
                </div>
            </main>
        </div>
    );
}