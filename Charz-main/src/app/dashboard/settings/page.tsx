'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './settings.module.css';

interface AdminSettings {
    adminName: string;
    email: string;
    language: string;
    syncInterval: string;
    updateChannel: string;
}

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    // Başlangıç değerlerini boş string yaparak "undefined" hatasını önlüyoruz
    const [settings, setSettings] = useState<AdminSettings>({
        adminName: '',
        email: '',
        language: 'TR',
        syncInterval: 'instant',
        updateChannel: 'stable'
    });

    // URL Yapılandırması
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
    const API_URL = `${BASE_URL}/api/settings`;

    // 1. Mevcut Ayarları Backend'den Çek
    useEffect(() => {
        const fetchSettings = async () => {
            if (!BASE_URL) return;
            try {
                const res = await fetch(API_URL);
                if (res.ok) {
                    const data = await res.json();
                    // Gelen veri içindeki alanların null olmamasını garanti ediyoruz
                    setSettings({
                        adminName: data.adminName || '',
                        email: data.email || '',
                        language: data.language || 'TR',
                        syncInterval: data.syncInterval || 'instant',
                        updateChannel: data.updateChannel || 'stable'
                    });
                }
            } catch (err) {
                console.error("Ayarlar yüklenemedi:", err);
            }
        };
        fetchSettings();
    }, [BASE_URL, API_URL]);

    // 2. Input Değişikliklerini Yönet
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    // 3. Ayarları Kaydet
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                alert("Ayarlar başarıyla güncellendi! ✅");
            } else {
                throw new Error("Sunucu hatası");
            }
        } catch (err) {
            console.error("Kaydetme hatası:", err);
            alert("Bağlantı hatası: Ayarlar kaydedilemedi.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                ← Dashboard&apos;a Dön
            </Link>

            <header style={{ marginTop: '20px' }}>
                <h1 className={styles.title}>Sistem Ayarları</h1>
            </header>

            <form onSubmit={handleSave}>
                {/* 1. PROFİL AYARLARI */}
                <section className={styles.section}>
                    <h2>👤 Admin Profil Yönetimi</h2>
                    <div className={styles.inputGroup}>
                        <label>Yönetici Adı</label>
                        <input
                            type="text"
                            name="adminName"
                            value={settings.adminName || ''} // Fallback: undefined hatasını çözen kısım
                            onChange={handleChange}
                            placeholder="Togg Yetkilisi"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>E-posta Adresi</label>
                        <input
                            type="email"
                            name="email"
                            value={settings.email || ''} // Fallback: undefined hatasını çözen kısım
                            onChange={handleChange}
                            placeholder="admin@togg.com.tr"
                        />
                    </div>
                </section>

                {/* 2. SİSTEM ÖZELLİKLERİ */}
                <section className={styles.section}>
                    <h2>⚙️ Altyapı ve Veri Ayarları</h2>
                    <div className={styles.inputGroup}>
                        <label>Varsayılan Dil</label>
                        <select name="language" value={settings.language || 'TR'} onChange={handleChange}>
                            <option value="TR">Türkçe (TR)</option>
                            <option value="EN">English (EN)</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Şarj İstasyonu Senkronizasyonu</label>
                        <select name="syncInterval" value={settings.syncInterval || 'instant'} onChange={handleChange}>
                            <option value="instant">Anlık Veri Akışı</option>
                            <option value="5min">5 Dakikada bir</option>
                            <option value="manual">Manuel Güncelleme</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Yazılım Güncelleme Kanalı</label>
                        <select name="updateChannel" value={settings.updateChannel || 'stable'} onChange={handleChange}>
                            <option value="stable">Kararlı Sürüm (Stable)</option>
                            <option value="beta">Beta Sürümü (Test)</option>
                        </select>
                    </div>
                </section>

                {/* 3. TEHLİKELİ BÖLGE */}
                <section className={styles.dangerSection}>
                    <h2>⚠️ KRİTİK İŞLEMLER</h2>
                    <p>Aşağıdaki buton tüm verileri kalıcı olarak sıfırlar.</p>
                    <button type="button" className={styles.dangerBtn} onClick={() => {
                        if(confirm("Tüm verileri silmek istediğinize emin misiniz?")) {
                            alert("Sistem sıfırlama komutu gönderildi.");
                        }
                    }}>
                        Sistemi Fabrika Ayarlarına Döndür
                    </button>
                </section>

                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                    <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                        {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Uygula'}
                    </button>
                </div>
            </form>
        </div>
    );
}