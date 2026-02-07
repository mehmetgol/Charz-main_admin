'use client';
import { useState, useEffect } from 'react';
import styles from './stations.module.css';
import Link from 'next/link';

interface Station {
    id: number;
    name: string;
    location: string;
    status: string;
    usedSockets: number;
    totalSockets: number;
}

export default function StationsPage() {
    const [stations, setStations] = useState<Station[]>([]);
    const [newStation, setNewStation] = useState({ name: '', location: '', totalSockets: 2, status: 'Aktif' });

    // Windows localhost sorunlarını önlemek için 127.0.0.1 kullanımı
    const API_URL = 'http://127.0.0.1:5000/api/stations';

    const fetchStations = async () => {
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setStations(data);
            }
        } catch (err) {
            console.error("Veri çekilemedi:", err);
        }
    };

    useEffect(() => { fetchStations(); }, []);

    // EKLEME VE GÜNCELLEME DÜZELTİLDİ
    const handleSave = async (stationData: any) => {
        try {
            const res = await fetch(`${API_URL}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // id: 0 ise yeni kayıt, id > 0 ise güncelleme
                body: JSON.stringify({
                    ...stationData,
                    totalSockets: Number(stationData.totalSockets),
                    usedSockets: Number(stationData.usedSockets || 0)
                })
            });

            if (res.ok) {
                setNewStation({ name: '', location: '', totalSockets: 2, status: 'Aktif' });
                await fetchStations();
            } else {
                const errorData = await res.json();
                alert("Hata: " + errorData.error);
            }
        } catch (err) {
            alert("Sunucuya ulaşılamadı!");
        }
    };

    // SİLME DÜZELTİLDİ
    const handleDelete = async (id: number) => {
        if (!window.confirm("Bu istasyonu silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                console.log(`ID ${id} başarıyla silindi`);
                await fetchStations();
            } else {
                alert("Silme işlemi başarısız!");
            }
        } catch (err) {
            alert("Bağlantı hatası!");
        }
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>TOGG CHARZ</h2>
                <nav className={styles.navMenu}>
                    <Link href="/dashboard" className={styles.navItem}>📊 Genel Bakış</Link>
                    <Link href="/dashboard/vehicles" className={styles.navItem}>🚗 Araç Listesi</Link>
                    <Link href="/dashboard/stations" className={`${styles.navItem} ${styles.active}`}>🔌 İstasyonlar</Link>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>İstasyon Yönetimi</h1>
                </header>

                {/* EKLEME FORMU */}
                <section className={styles.formCard}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave({ ...newStation, id: 0 }); }} className={styles.addForm}>
                        <input placeholder="İstasyon Adı" value={newStation.name} onChange={e => setNewStation({...newStation, name: e.target.value})} required />
                        <input placeholder="Konum" value={newStation.location} onChange={e => setNewStation({...newStation, location: e.target.value})} required />
                        <input type="number" placeholder="Soket Sayısı" value={newStation.totalSockets} onChange={e => setNewStation({...newStation, totalSockets: Number(e.target.value)})} required />
                        <button type="submit">➕ Ekle</button>
                    </form>
                </section>

                <div className={styles.grid}>
                    {stations.map((s) => (
                        <div key={s.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3>{s.name}</h3>
                                {/* onClick fonksiyonu düzeltildi */}
                                <button className={styles.deleteBtn} onClick={() => handleDelete(s.id)}>🗑️</button>
                            </div>
                            <p>📍 {s.location}</p>

                            <div className={styles.statusBox}>
                                <span>Durum:</span>
                                <select
                                    value={s.status}
                                    onChange={(e) => handleSave({ ...s, status: e.target.value })}
                                    className={styles[`status${s.status}`]}
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Arızalı">Arızalı</option>
                                    <option value="Bakımda">Bakımda</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}