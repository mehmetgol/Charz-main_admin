'use client';
import styles from './stations.module.css';
import Link from 'next/link';

const stations = [
    { id: 1, name: "Togg Trugo - Zorlu Center", location: "İstanbul", status: "Aktif", used: 2, total: 4, type: styles.active },
    { id: 2, name: "Togg Trugo - Panora AVM", location: "Ankara", status: "Dolu", used: 8, total: 8, type: styles.busy },
    { id: 3, name: "Togg Trugo - İzmir Otoban", location: "İzmir", status: "Bakımda", used: 0, total: 2, type: styles.maintenance },
    { id: 4, name: "Togg Trugo - Bursa Fabrika", location: "Bursa", status: "Aktif", used: 1, total: 6, type: styles.active },
];

export default function StationsPage() {
    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: '#22c55e', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginBottom: '15px'}}>
                ← Dashboard'a Dön
            </Link>

            <h1 className={styles.title}>Şarj İstasyonları Durumu</h1>

            <div className={styles.grid}>
                {stations.map((s) => (
                    <div key={s.id} className={`${styles.stationCard} ${s.type}`}>
                        <div className={styles.stationHeader}>
                            <div>
                                <div className={styles.stationName}>{s.name}</div>
                                <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{s.location}</div>
                            </div>
                            <span style={{fontSize: '0.75rem', fontWeight: 'bold', color: s.status === 'Dolu' ? '#3b82f6' : '#64748b'}}>
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
                                        backgroundColor: s.status === 'Dolu' ? '#3b82f6' : '#22c55e'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}