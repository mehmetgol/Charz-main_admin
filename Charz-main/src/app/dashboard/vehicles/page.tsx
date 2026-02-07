'use client';
import { useState, useEffect } from 'react';
import styles from './vehicles.module.css';
import Link from 'next/link';

interface Vehicle {
    id: number;
    model: string;
    plate: string;
    battery: number;
    status: string;
}

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [newVehicle, setNewVehicle] = useState({ model: '', plate: '', status: 'Beklemede' });
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/vehicles';

    // 1. VERİLERİ ÇEK
    const fetchVehicles = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setVehicles(data);
        } catch (err) {
            console.error("Veri çekme hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // 2. YENİ ARAÇ EKLE
    const addVehicle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVehicle.model || !newVehicle.plate) return alert("Lütfen alanları doldurun!");

        const vehicleData = {
            id: 0, // Yeni kayıt için 0 gönderiyoruz (Backend upsert bunu yeni kayıt olarak görecek)
            model: newVehicle.model,
            plate: newVehicle.plate,
            status: newVehicle.status,
            battery: 0
        };

        try {
            const response = await fetch(`${API_URL}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicleData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Araç başarıyla kaydedildi!");
                setNewVehicle({ model: '', plate: '', status: 'Beklemede' });
                fetchVehicles(); // Listeyi güncelle
            } else {
                alert("Hata: " + (result.error || "Bilinmeyen bir sorun oluştu"));
            }
        } catch (err) {
            console.error("Bağlantı hatası:", err);
            alert("Backend sunucusuna ulaşılamadı. Sunucunun 5000 portunda açık olduğundan emin olun!");
        }
    };

    // 3. ARAÇ SİL
    const deleteVehicle = async (id: number) => {
        if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchVehicles();
            }
        } catch (err) {
            console.error("Silme hatası:", err);
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: '#22c55e', marginBottom: '20px', display: 'block'}}>
                ← Dashboard'a Dön
            </Link>

            <h1 className={styles.title}>Araç Yönetimi</h1>

            <div className={styles.addForm}>
                <h3>Yeni Araç Kaydı</h3>
                <form onSubmit={addVehicle} className={styles.formInline}>
                    <input
                        type="text"
                        placeholder="Model"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Plaka"
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
                    <button type="submit" className={styles.addButton}>Ekle ve Kaydet</button>
                </form>
            </div>

            <div className={styles.tableWrapper}>
                {loading ? <p>Yükleniyor...</p> : (
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
                                <td>%{v.battery}</td>
                                <td>{v.status}</td>
                                <td>
                                    <button onClick={() => deleteVehicle(v.id)} className={styles.deleteButton}>Sil</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}