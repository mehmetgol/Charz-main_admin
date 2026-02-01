'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './settings.module.css';

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 'bold' }}>
                ← Dashboard'a Dön
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
                        <input type="text" placeholder="Togg Yetkilisi" defaultValue="Admin User" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>E-posta Adresi</label>
                        <input type="email" placeholder="admin@togg.com.tr" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Şifre Güncelleme</label>
                        <input type="password" placeholder="Yeni şifrenizi girin" />
                    </div>
                </section>

                {/* 2. SİSTEM ÖZELLİKLERİ */}
                <section className={styles.section}>
                    <h2>⚙️ Altyapı ve Veri Ayarları</h2>
                    <div className={styles.inputGroup}>
                        <label>Varsayılan Dil</label>
                        <select>
                            <option>Türkçe (TR)</option>
                            <option>English (EN)</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Şarj İstasyonu Senkronizasyonu</label>
                        <select>
                            <option>Anlık Veri Akışı</option>
                            <option>5 Dakikada bir</option>
                            <option>Manuel Güncelleme</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Yazılım Güncelleme Kanalı</label>
                        <select>
                            <option>Kararlı Sürüm (Stable)</option>
                            <option>Beta Sürümü (Test)</option>
                        </select>
                    </div>
                </section>

                {/* 3. TEHLİKELİ BÖLGE */}
                <section className={styles.dangerSection}>
                    <h2>⚠️ KRİTİK İŞLEMLER</h2>
                    <p>
                        Aşağıdaki buton tüm istasyon verilerini ve kullanıcı kayıtlarını kalıcı olarak sıfırlar.
                        Bu işlem geri alınamaz.
                    </p>
                    <button type="button" className={styles.dangerBtn}>
                        Sistemi Fabrika Ayarlarına Döndür
                    </button>
                </section>

                {/* KAYDET BUTONU */}
                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                    <button type="submit" className={styles.saveBtn}>
                        {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Uygula'}
                    </button>
                </div>
            </form>
        </div>
    );
}