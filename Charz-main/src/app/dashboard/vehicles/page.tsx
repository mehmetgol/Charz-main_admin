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

    // --- URL YAPILANDIRMASI ---
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
    const API_URL = `${BASE_URL}/api/vehicles`;

    // 1. VERİLERİ ÇEK
    const fetchVehicles = async () => {
        if (!BASE_URL) return;
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setVehicles(data);
            }
        } catch (err) {
            console.error("Veri çekme hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, [BASE_URL]);

    // 2. YENİ ARAÇ EKLE
    const addVehicle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVehicle.model || !newVehicle.plate) return alert("Lütfen alanları doldurun!");

        const vehicleData = {
            id: 0, // Yeni kayıt için 0
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

            if (response.ok) {
                alert("Araç başarıyla kaydedildi! ✅");
                setNewVehicle({ model: '', plate: '', status: 'Beklemede' });
                fetchVehicles();
            } else {
                const result = await response.json();
                alert("Hata: " + (result.error || "Bilinmeyen bir sorun oluştu"));
            }
        } catch (err) {
            console.error("Bağlantı hatası:", err);
            alert("Sunucuya ulaşılamadı. Lütfen Render bağlantısını kontrol edin.");
        }
    };

    // 3. ARAÇ SİL
    const deleteVehicle = async (id: number) => {
        if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchVehicles();
            } else {
                alert("Silme işlemi sunucu tarafında başarısız oldu.");
            }
        } catch (err) {
            console.error("Silme hatası:", err);
            alert("Bağlantı hatası: Araç silinemedi.");
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{color: '#22c55e', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontWeight: 'bold'}}>
                ← Dashboard'a Dön
            </Link>

            <h1 className={styles.title}>Araç Yönetimi</h1>

            <div className={styles.addForm}>
                <h3>Yeni Araç Kaydı</h3>
                <form onSubmit={addVehicle} className={styles.formInline}>
                    <input
                        type="text"
                        placeholder="Model (Örn: Togg T10X)"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                        className={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Plaka (Örn: 34 TOGG 1923)"
                        value={newVehicle.plate}
                        onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})}
                        className={styles.input}
                        required
                    />
                    <select
                        value={newVehicle.status}
                        onChange={(e) => setNewVehicle({...newVehicle, status: e.target.value})}
                        className={styles.select}
                    >
                        <option value="Beklemede">Beklemede</option>
                        <option value="Şarj Oluyor">Şarj Oluyor</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                    </select>
                    <button type="submit" className={styles.addButton}>Ekle ve Kaydet</button>
                </form>
            </div>

            <div className={styles.tableWrapper}>
                {loading ? (
                    <div style={{textAlign: 'center', padding: '40px'}}>
                        <p>⏳ Veriler yükleniyor (Render sunucusu uyanıyor olabilir)...</p>
                    </div>
                ) : (
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
                        {vehicles.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{textAlign: 'center', padding: '20px'}}>Kayıtlı araç bulunamadı.</td>
                            </tr>
                        ) : (
                            vehicles.map((v) => (
                                <tr key={v.id}>
                                    <td><b>{v.model}</b></td>
                                    <td>{v.plate}</td>
                                    <td>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                            <div style={{width: '40px', height: '10px', background: '#eee', borderRadius: '5px', overflow: 'hidden'}}>
                                                <div style={{width: `${v.battery}%`, height: '100%', background: v.battery > 20 ? '#22c55e' : '#ef4444'}}></div>
                                            </div>
                                            %{v.battery}
                                        </div>
                                    </td>
                                    <td>
                                            <span className={styles[`status${v.status.replace(' ', '')}`] || styles.statusDefault}>
                                                {v.status}
                                            </span>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteVehicle(v.id)} className={styles.deleteButton}>Sil</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}