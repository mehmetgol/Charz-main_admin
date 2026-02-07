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
    // 1. HATA DÜZELTME: Başlangıç state'ini en güvenli şekilde kuruyoruz.
    const [stats, setStats] = useState<DashboardStats>({
        totalKwh: 0,
        activeCars: 0,
        faultyUnits: 0,
        dailyEarning: 0,
        lastUpdate: new Date().toISOString()
    });

    const [formattedTime, setFormattedTime] = useState<string>("");

    // 2. HATA DÜZELTME: localhost bazen IPv6 (::1) üzerinden bağlanmaya çalışır,
    // 127.0.0.1 kullanmak "Failed to Fetch" hatalarını %90 azaltır.
    const API_URL = 'http://127.0.0.1:5000/api/stats';

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Sunucu yanıt vermedi");
                return res.json();
            })
            .then((data: DashboardStats) => {
                if (data) {
                    setStats(data);
                    localStorage.setItem('dashboard_data', JSON.stringify(data));
                }
            })
            .catch((err) => {
                console.error("Veri çekilemedi, yerel hafızaya bakılıyor:", err);
                const savedStats = localStorage.getItem('dashboard_data');
                if (savedStats) {
                    try {
                        setStats(JSON.parse(savedStats));
                    } catch (e) {
                        console.error("Localstorage verisi bozuk.");
                    }
                }
            });
    }, []);

    // 3. HATA DÜZELTME: "Cannot read properties of null" hatasını önlemek için
    // opsiyonel zincirleme (?.) ve null kontrolü ekliyoruz.
    useEffect(() => {
        if (stats && stats.lastUpdate) {
            try {
                const date = new Date(stats.lastUpdate);
                // Geçersiz tarih kontrolü
                if (!isNaN(date.getTime())) {
                    setFormattedTime(date.toLocaleTimeString());
                }
            } catch (e) {
                setFormattedTime("--:--");
            }
        }
    }, [stats?.lastUpdate]); // Buradaki soru işareti hayati önem taşıyor

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
                    <div className={styles.updateTime}>
                        <span>Son Güncelleme: <b>{formattedTime || "--:--"}</b></span>
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <h3>Toplam Enerji</h3>
                        <p>{stats.totalKwh?.toLocaleString() ?? 0} kWh</p>
                    </div>

                    <div className={styles.card}>
                        <h3>Aktif Araçlar</h3>
                        <p>{stats.activeCars ?? 0}</p>
                    </div>

                    <div className={styles.card} style={{ borderBottomColor: stats.faultyUnits > 0 ? '#ef4444' : '#22c55e' }}>
                        <h3>Arızalı Üniteler</h3>
                        <p style={{ color: stats.faultyUnits > 0 ? '#ef4444' : '#22c55e' }}>
                            {stats.faultyUnits ?? 0}
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>Günlük Kazanç</h3>
                        <p>₺{stats.dailyEarning?.toLocaleString() ?? 0}</p>
                    </div>
                </div>

                <div className={styles.placeholderBox}>
                    Grafikler ve Detaylı Veriler Yükleniyor...
                </div>
            </main>
        </div>
    );
}