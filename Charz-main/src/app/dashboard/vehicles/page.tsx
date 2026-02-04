'use client';
import { useState } from 'react';
import styles from './vehicles.module.css';
import Link from 'next/link';

// İlk verilerimizi bir state içine alıyoruz
const initialVehicles = [
    { id: 1, model: "Togg T10X", plate: "34 TOGG 2026", battery: "%85", status: "Şarj Oluyor", class: styles.charging },
    { id: 2, model: "Togg T10X", plate: "06 TGG 06", battery: "%40", status: "Beklemede", class: styles.idle },
    { id: 3, model: "Togg T10S", plate: "35 ABC 123", battery: "%12", status: "Bağlantı Yok", class: styles.offline },
];

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [newVehicle, setNewVehicle] = useState({ model: '', plate: '', status: 'Beklemede' });

    // Yeni araç ekleme fonksiyonu
    const addVehicle = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVehicle.model || !newVehicle.plate) return alert("Lütfen boş alanları doldurun!");

        const vehicleToAdd = {
            id: Date.now(), // Geçici benzersiz ID
            model: newVehicle.model,
            plate: newVehicle.plate,
            battery: "%0", // Yeni eklenen araç %0 ile başlasın
            status: newVehicle.status,
            class: newVehicle.status === "Şarj Oluyor" ? styles.charging : styles.idle
        };

        setVehicles([...vehicles, vehicleToAdd]);
        setNewVehicle({ model: '', plate: '', status: 'Beklemede' }); // Formu sıfırla
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: '#22c55e', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginBottom: '20px'}}>
                ← Dashboard'a Dön
            </Link>

            <h1 className={styles.title}>Araç Yönetimi</h1>

            {/* Yeni Araç Ekleme Formu */}
            <div className={styles.addForm}>
                <h3>Yeni Araç Kaydı</h3>
                <form onSubmit={addVehicle} className={styles.formInline}>
                    <input
                        type="text"
                        placeholder="Model (Örn: Togg T10X)"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Plaka (Örn: 34 ABC 123)"
                        value={newVehicle.plate}
                        onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})}
                        className={styles.input}
                    />
                    <select
                        value={newVehicle.status}
                        onChange={(e) => setNewVehicle({...newVehicle, status: e.target.value})}
                        className={styles.select}
                    >
                        <option value="Beklemede">Beklemede</option>
                        <option value="Şarj Oluyor">Şarj Oluyor</option>
                    </select>
                    <button type="submit" className={styles.addButton}>Ekle</button>
                </form>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.vehicleTable}>
                    <thead>
                    <tr>
                        <th>Model</th>
                        <th>Plaka</th>
                        <th>Batarya</th>
                        <th>Durum</th>
                        <th>İşlem</th>
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
                            <td>
                                <button
                                    onClick={() => setVehicles(vehicles.filter(item => item.id !== v.id))}
                                    className={styles.deleteButton}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}