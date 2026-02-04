'use client';
import { useState } from 'react';
import styles from './stations.module.css';
import Link from 'next/link';

// Durumları ve onlara karşılık gelen CSS class'larını eşleştirelim
const STATUS_STYLES: Record<string, string> = {
    "Aktif": styles.active,
    "Dolu": styles.busy,
    "Bakımda": styles.maintenance
};

const initialStations = [
    { id: 1, name: "Togg Trugo - Zorlu Center", location: "İstanbul", status: "Aktif", used: 2, total: 4 },
    { id: 2, name: "Togg Trugo - Panora AVM", location: "Ankara", status: "Dolu", used: 8, total: 8 },
    { id: 3, name: "Togg Trugo - İzmir Otoban", location: "İzmir", status: "Bakımda", used: 0, total: 2 },
    { id: 4, name: "Togg Trugo - Bursa Fabrika", location: "Bursa", status: "Aktif", used: 1, total: 6 },
];

export default function StationsPage() {
    const [stations, setStations] = useState(initialStations);

    // Durumu değiştiren fonksiyon
    const toggleStatus = (id: number) => {
        setStations(prev => prev.map(s => {
            if (s.id === id) {
                const nextStatus = s.status === "Aktif" ? "Dolu" : s.status === "Dolu" ? "Bakımda" : "Aktif";
                return { ...s, status: nextStatus };
            }
            return s;
        }));
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: '#22c55e', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginBottom: '15px'}}>
                ← Dashboard&apos;a Dön
            </Link>

            <h1 className={styles.title}>Şarj İstasyonları Durumu</h1>
            <p style={{color: '#94a3b8', marginBottom: '20px', fontSize: '0.9rem'}}>* Durumu değiştirmek için kartların üzerine tıklayabilirsiniz.</p>

            <div className={styles.grid}>
                {stations.map((s) => (
                    <div
                        key={s.id}
                        className={`${styles.stationCard} ${STATUS_STYLES[s.status]}`}
                        onClick={() => toggleStatus(s.id)} // Tıklanınca durum değişir
                        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    >
                        <div className={styles.stationHeader}>
                            <div>
                                <div className={styles.stationName}>{s.name}</div>
                                <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{s.location}</div>
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                background: '#f1f5f9',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                color: s.status === 'Dolu' ? '#3b82f6' : s.status === 'Bakımda' ? '#ef4444' : '#22c55e'
                            }}>
                                {s.status}
                            </span>
                        </div>

                        <div className={styles.socketInfo}>
                            <span>Soket Kullanımı: <b>{s.used} / {s.total}</b></span>
                            <div className={styles.progressContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{
                                        width: `${(s.used / s.total) * 100}%`,
                                        backgroundColor: s.status === 'Dolu' ? '#3b82f6' : s.status === 'Bakımda' ? '#ef4444' : '#22c55e'
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div style={{marginTop: '10px', fontSize: '0.7rem', textAlign: 'right', opacity: 0.6}}>
                            Durumu Değiştirmek İçin Tıkla
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}