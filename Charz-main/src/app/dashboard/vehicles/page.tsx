'use client';
import styles from './vehicles.module.css';
import Link from 'next/link';

const vehicles = [
    { id: 1, model: "Togg T10X", plate: "34 TOGG 2026", battery: "%85", status: "Şarj Oluyor", class: styles.charging },
    { id: 2, model: "Togg T10X", plate: "06 TGG 06", battery: "%40", status: "Beklemede", class: styles.idle },
    { id: 3, model: "Togg T10S", plate: "35 ABC 123", battery: "%12", status: "Bağlantı Yok", class: styles.offline },
    { id: 4, model: "Togg T10X", plate: "34 EE 444", battery: "%100", status: "Beklemede", class: styles.idle },
];

export default function VehiclesPage() {
    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: 'green', textDecoration: 'none', fontWeight: 'bold'}}>
                ← Geri Dön
            </Link>

            <h1 className={styles.title}>Kayıtlı Araç Listesi</h1>

            <div className={styles.tableWrapper}>
                <table className={styles.vehicleTable}>
                    <thead>
                    <tr>
                        <th>Model</th>
                        <th>Plaka</th>
                        <th>Batarya Durumu</th>
                        <th>Durum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map((v) => (
                        <tr key={v.id}>
                            <td><b>{v.model}</b></td>
                            <td>{v.plate}</td>
                            <td>{v.battery}</td>
                            <td>
                                    <span className={`${styles.statusBadge} ${v.class}`}>
                                        {v.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}