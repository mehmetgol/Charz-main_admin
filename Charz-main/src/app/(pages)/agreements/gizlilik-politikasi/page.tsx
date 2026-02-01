import type { JSX } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";

// --- Breadcrumb Bileşeni (hakkimizda/page.tsx dosyasından kopyalandı) ---
type BreadcrumbItem = {
	href: string;
	label: string;
};

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

function Breadcrumb({ items }: BreadcrumbProps): JSX.Element {
	return (
		<nav aria-label="Breadcrumb">
			<ol className="flex items-center space-x-2 text-sm text-gray-500">
				{items.map((item, index) => (
					<li key={item.href} className="flex items-center">
						{index > 0 && <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />}
						<Link
							href={item.href}
							className={`transition-colors ${
								index === items.length - 1
									? "font-semibold text-gray-800"
									: "hover:text-gray-700"
							}`}
							aria-current={index === items.length - 1 ? "page" : undefined}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	);
}
// --- Breadcrumb Bileşeni Sonu ---

export default function KullaniciSozlesmesiPage(): JSX.Element {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ href: "/", label: "Anasayfa" },
		{ href: "/agreements/kullanim-kosullari", label: "Kullanıcı Sözleşmesi" },
	];

	return (
		<div className="py-24 sm:py-32">
			<Container>
				<Breadcrumb items={breadcrumbItems} />

				<article className="prose prose-slate lg:prose-lg mx-auto mt-12">
					<h1>Charz - Kullanıcı Sözleşmesi</h1>

					<h2>1. TARAFLAR VE TANIMLAR</h2>
					<p>
						İşbu Kullanıcı Sözleşmesi (&quot;Sözleşme&quot;), bir tarafta: 42 Maslak, Maslak Mah.
						Ahi Evran Cad.Sarıyer, İstanbul adresinde yerleşik, İstanbul Ticaret Sicil Müdürlüğü&apos;ne
						0732197124500001 MERSİS numarası ile kayıtlı POS PLANET DANIŞMANLIK TİCARET LTD
						(&quot;Şirket veya Charz&quot;) ile diğer tarafta mobil uygulama (&quot;Uygulama&quot;) veya
						https://charz.com.tr (&quot;Web Sitesi&quot;) üzerinden hizmetlerden yararlanan gerçek ya da tüzel
						kişi (&quot;Kullanıcı&quot;) arasında akdedilmiştir.
					</p>
					<p>
						Şirket ve Kullanıcı birlikte &quot;Taraflar&quot;, ayrı ayrı ise
						&quot;Taraf&quot; olarak anılacaktır.
					</p>

					<h3>1.1 Tanımlar</h3>
					<p><strong>Uygulama:</strong> Şirket tarafından geliştirilmiş, mobil cihazlara indirilebilir yazılım.</p>
					<p><strong>Web Sitesi:</strong> https://charz.com.tr alan adlı dijital platform.</p>
					<p><strong>Hizmet(ler):</strong> Şirket tarafından Kullanıcılara sağlanan ve şarj istasyonu bulma, rota planlama,
						müsaitlik bilgisi görüntüleme, ödeme, rezervasyon, değerlendirme, kampanya sunumu, veri
						analitiği gibi işlemleri içeren dijital işlevselliklerin tamamı.</p>
					<p><strong>Kullanıcı:</strong> Hizmetlerden yararlanan, Sözleşme&apos;yi kabul etmiş gerçek veya tüzel kişi.</p>
					<p><strong>Kişisel Veri:</strong> Kullanıcı&apos;ya ilişkin ad, soyad, T.C.
						kimlik no, konum, ödeme bilgisi, şarj
						alışkanlığı, cihaz bilgileri gibi her türlü bilgi.</p>
					<p><strong>Ticari Elektronik İleti:</strong> Şirket tarafından Kullanıcı&apos;ya gönderilen tanıtım, bilgilendirme,
						kampanya, reklam içerikli her türlü e-posta, SMS, çağrı vb. iletiler.</p>

					<h2>2. SÖZLEŞMENİN KONUSU VE KAPSAMI</h2>
					<p>
						İşbu Sözleşme, Charz Uygulaması ve/veya Web Sitesi üzerinden sunulan hizmetlerin
						kullanımına dair koşulları belirler. Tarafların hak, yükümlülük ve sorumluluklarını açıklar.
						Bu Sözleşme, Hizmetlerin kullanımına başlanmasıyla birlikte Kullanıcı tarafından okunmuş,
						kabul edilmiş ve onaylanmış sayılır.
					</p>

					<h2>3. ÜYELİK KOŞULLARI VE HESAP OLUŞTURMA</h2>
					<p>
						3.1 Uygulama&apos;dan Hizmet alabilmek için Kullanıcı&apos;nın üyelik oluşturması gerekebilir. Üyelik
						oluştururken beyan edilen bilgilerin doğru, güncel ve eksiksiz olması zorunludur.
						Yanıltıcı bilgi veren Kullanıcı&apos;nın üyeliği Şirket tarafından iptal edilebilir.
					</p>
					<p>
						3.2 Kullanıcı hesabı yalnızca şahsen kullanılabilir. Başka bir kişiye devri, ödünç verilmesi
						veya kullanımına izin verilmesi durumunda doğacak tüm sonuçlardan Kullanıcı sorumludur.
					</p>
					<p>
						3.3 Tüzel kişilikler adına işlem yapılması durumunda, işlemi yapan kişinin yetkilendirilmiş
						olduğu varsayılır. Bu konuda herhangi bir teyit yükümlülüğü Şirket&apos;e ait değildir.
					</p>

					<h2>4. HİZMETLERİN TANIMI VE SUNUM ŞEKLİ</h2>
					<p>
						4.1 Charz, kullanıcıların çevredeki elektrikli araç şarj istasyonlarını bulmasını, müsaitlik
						durumunu görüntülemesini, istasyonları değerlendirmesini, rota planlaması yapmasını, şarj
						işlemlerini başlatmasını ve ödeme yapmasını sağlayan dijital bir platformdur.
					</p>
					<p>
						4.2 Şirket, Hizmetler kapsamında Kullanıcı&apos;ya rota önerileri, indirimli kampanyalar, kullanıcı
						deneyimi analizleri, promosyonlar, sadakat programları, kuponlar ve API ile entegre 3. taraf
						hizmet sağlayıcı verileri sunabilir.
					</p>
					<p>
						4.3 Kullanıcı, hizmetlerin doğası gereği gerçek zamanlı harita, trafik, konum ve fiyat
						bilgilerine bağlı değişikliklerin olabileceğini, bunların garanti edilmediğini kabul eder.
					</p>

					<h2>5. KULLANICININ HAK VE YÜKÜMLÜLÜKLERİ</h2>
					<p>
						5.1 Kullanıcı, Şirket&apos;in sağladığı Hizmetleri sadece yasal amaçlarla ve işbu Sözleşme ile
						belirtilen kurallar çerçevesinde kullanmayı kabul eder.
					</p>
					<p>
						5.2 Kullanıcı, Uygulama veya Web Sitesi aracılığıyla sağlanan hizmetleri kötüye
						kullanmayacağını, Şirket&apos;in sistemlerine zarar verici herhangi bir işlemde bulunmayacağını,
						tersine mühendislik yapmayacağını taahhüt eder.
					</p>
					<p>
						5.3 Kullanıcı, hesabına ait şifre ve erişim bilgilerini gizli tutmakla yükümlüdür. Şifre
						güvenliğinin sağlanmamasından doğacak zararlardan Şirket sorumlu değildir.
					</p>
					<p>
						5.4 Kullanıcı, Şirket&apos;in yazılı onayı olmaksızın Uygulama üzerinde ticari faaliyet, reklam
						yayını veya üçüncü kişilere ait içerik dağıtımı gerçekleştiremez.
					</p>

					<h2>6. ŞİRKETİN HAK VE YÜKÜMLÜLÜKLERİ</h2>
					<p>
						6.1 Şirket, kullanıcılarına kesintisiz, güvenli ve yasalara uygun bir hizmet sunmakla
						yükümlüdür. Ancak teknik nedenlerden kaynaklı kesintilerden, mücbir sebeplerden veya 3.
						taraf altyapılardaki arızalardan dolayı oluşabilecek aksaklıklardan sorumlu tutulamaz.
					</p>
					<p>
						6.2 Şirket, Uygulama ve Web Sitesi üzerinde yer alan içerikleri ve Hizmetleri dilediği zaman
						değiştirme, kaldırma, geçici veya kalıcı olarak durdurma hakkına sahiptir.
					</p>
					<p>
						6.3 Şirket, Kullanıcı&apos;nın şikayet, talep ve bildirimlerine belirli süreler içerisinde dönüş
						sağlamakla yükümlüdür. Süre, talebin içeriğine göre makul ölçüde belirlenir.
					</p>

					<h2>7. ÖDEME VE FATURALANDIRMA</h2>
					<p>
						7.1 Uygulama üzerinden yapılacak ödeme işlemleri, Türkiye Cumhuriyeti yasalarına ve PCI-
						DSS güvenlik standartlarına uygun ödeme sağlayıcıları (ör. Paywall) aracılığıyla
						gerçekleştirilir.
					</p>
					<p>
						7.2 Kullanıcı, şarj işlemi başladıktan sonra gerçekleşen tüm ücretlerden ve ek masraflardan
						sorumludur. İlgili bilgiler ödeme ekranında detaylı şekilde gösterilir.
					</p>
					<p>
						7.3 Şirket, sadece işlem aracı olup, istasyon işletmecileri adına faturalandırma yapabilir.
						Bu kapsamda Şirket&apos;in istasyon hizmetinin niteliğinden veya hatalı faturalamadan sorumluluğu
						sınırlıdır.
					</p>

					<h2>8. FİKRİ MÜLKİYET HAKLARI</h2>
					<p>
						8.1 Charz markası, logosu, içeriği, yazılım altyapısı, mobil uygulama arayüzü ve veri
						algoritmaları dâhil olmak üzere tüm bileşenler, Şirket&apos;in fikri mülkiyetindedir.
					</p>
					<p>
						8.2 Kullanıcı, bu unsurları herhangi bir şekilde kopyalayamaz, değiştiremez, dağıtamaz,
						ticari olarak kullanamaz. Aksi davranış, Türk Ceza Kanunu, 5846 Sayılı Fikir ve Sanat Eserleri
						Kanunu ve ilgili fikri mülkiyet hükümleri kapsamında cezai yaptırıma tabidir.
					</p>

					<h2>9. SORUMLULUK REDDİ</h2>
					<p>
						9.1 Şirket, Uygulama ve Web Sitesi üzerinden erişilen şarj istasyonlarının uygunluğu, teknik
						durumu, şarj kapasitesi, fiyatlandırma yapısı ve çevresel koşullar gibi üçüncü tarafların
						sunduğu bilgilerde meydana gelebilecek eksiklik, yanlışlık veya aksaklıklardan sorumlu
						değildir.
					</p>
					<p>
						9.2 Şirket, Kullanıcı&apos;nın Uygulama aracılığıyla edindiği bilgi veya hizmet nedeniyle
						uğrayabileceği dolaylı zararlar, veri kaybı, kâr kaybı, iş kesintisi gibi doğrudan Şirket&apos;in kasıt
						veya ağır ihmalinden kaynaklanmayan zararlardan dolayı sorumlu tutulamaz.
					</p>
					<p>
						9.3 Kullanıcı&apos;nın kendi kusuruyla gerçekleştirdiği yanlış şarj işlemleri, lokasyon hataları,
						rezervasyon iptalleri, yanlış ödeme adımları, mobil cihaz güvenlik açıkları ve benzeri
						konularda sorumluluk Kullanıcıya aittir.
					</p>

					<h2>10. CAYMA HAKKI VE ÜYELİK İPTALİ</h2>
					<p>
						10.1 Kullanıcı, dilerse üyeliğini herhangi bir sebep belirtmeden Uygulama veya Web Sitesi
						üzerinde yer alan &quot;Hesap Silme&quot; özelliğini kullanarak iptal edebilir.
					</p>
					<p>
						10.2 Şirket, Kullanıcının işbu Sözleşme&apos;ye aykırı davranması, yasa dışı işlem
						gerçekleştirmesi veya sistem güvenliğini tehdit edici faaliyetlerde bulunması halinde üyeliği
						geçici olarak askıya alabilir veya kalıcı olarak sonlandırabilir.
					</p>
					<p>
						10.3 Cayma hakkının istisnaları: Kullanıcı, şarj hizmeti başladıktan sonra bu hizmetin
						doğrudan ifasına başlanmış olması nedeniyle cayma hakkını kullanamaz. Bu, 6502 sayılı
						Tüketicinin Korunması Hakkında Kanun&apos;un 15. maddesi gereğince istisna kapsamındadır.
					</p>

					<h2>11. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
					<p>
						11.1 İşbu Sözleşme kapsamındaki uyuşmazlıklarda öncelikle Şirket ile Kullanıcı arasında
						müzakere ile çözüm aranacaktır. Taraflar, karşılıklı iyi niyet çerçevesinde anlaşmazlıkları
						çözmeye çalışacaklardır.
					</p>
					<p>
						11.2 Anlaşmazlığın giderilememesi halinde, 6502 sayılı yasa uyarınca Tüketici Hakem
						Heyetleri veya Tüketici Mahkemeleri yetkilidir. Kullanıcı tacir veya kamu tüzel kişisi ise,
						İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Müdürlükleri yetkilidir.
					</p>
					<p>
						11.3 Şirketin sistemine izinsiz giriş, kötüye kullanım, hileli işlem, sistem engelleme vb.
						eylemler Türk Ceza Kanunu ve ilgili mevzuat kapsamında adli makamlara bildirilebilir.
					</p>

					<h2>12. SÖZLEŞME DEĞİŞİKLİKLERİ</h2>
					<p>
						12.1 Şirket, gerekli gördüğü takdirde bu Sözleşme hükümlerini tek taraflı olarak
						güncelleyebilir. Güncel hali Uygulama ve Web Sitesi üzerinden duyurulacaktır.
					</p>
					<p>
						12.2 Değişiklikler yayımlandığı tarihten itibaren geçerli olur. Kullanıcı&apos;nın hizmetleri
						kullanmaya devam etmesi, yeni hükümleri kabul ettiği anlamına gelir.
					</p>
					<p>
						12.3 Kullanıcı, değişikliklerden memnun değilse hesabını kapatarak üyeliğini sona
						erdirebilir.
					</p>

					<h2>13. UYGULANACAK HUKUK VE YETKİLİ MAHKEME</h2>
					<p>
						13.1 İşbu Sözleşme&apos;nin uygulanmasında ve yorumlanmasında Türkiye Cumhuriyeti
						kanunları esas alınacaktır.
					</p>
					<p>
						13.2 Yasal yetki sınırları dâhilinde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri
						münhasır yetkilidir.
					</p>

					<h2>14. YÜRÜRLÜK VE KABUL</h2>
					<p>
						14.1. Kullanıcı, üyelik oluşturduğunda veya Uygulama&apos;yı indirdiğinde işbu Sözleşme
						hükümlerini kabul etmiş sayılır.
					</p>
					<p>
						14.2. Şirket, bu Sözleşme&apos;yi kullanıcıya elektronik ortamda sunmakla yükümlüdür. Kullanıcı
						dilediği zaman Sözleşme&apos;nin bir örneğine Uygulama veya Web Sitesi üzerinden erişebilir.
					</p>
					<p>
						14.3. Sözleşme, yürürlüğe girdiği tarihten itibaren süresiz olarak geçerli olur.
					</p>

					<hr />

					<h3>İLETİŞİM BİLGİLERİ</h3>
					<p><strong>POS PLANET DANIŞMANLIK TİCARET LTD</strong></p>
					<p>Adres: 42 Maslak, Maslak Mah. Ahi Evran Cad.Sarıyer, İstanbul</p>
					<p>E-posta: info@charz.com.tr</p>
					<p>Web: https://charz.com.tr</p>

				</article>
			</Container>
		</div>
	);
}