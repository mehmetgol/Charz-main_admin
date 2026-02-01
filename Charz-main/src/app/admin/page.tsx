'use client';

import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
// useState ve useEffect burada gerekli değilse silebilirsin ama
// dashboard'da kesin lazım olacak.

export default function Login() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Kayıt başarılı, yönlendiriliyor...");
        router.push('/dashboard');
    };

    return (
        <div>
            <header className={styles.header}>
                Hoş Geldin Admin
            </header>

            <main className={styles.mainContent}>
                <img
                    src="/togg.png"
                    alt="Togg"
                    className={styles.toggImage}
                />

                <div className={styles.registerBox}>
                    <h2>Kayıt Ol</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Gmail Adresi</label>
                            <input type="email" placeholder="ornek@gmail.com" required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Şifre</label>
                            <input type="password" placeholder="******" required />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Devam Et
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}