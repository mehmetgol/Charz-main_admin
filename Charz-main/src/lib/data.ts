import {Bubble, FooterLink, HeroData, NavLink, Solution} from "@/types";

const FACTOR: number = 1.2;
const IMAGE_WIDTH : number = 148.5 * FACTOR;
const IMAGE_HEIGHT : number = 44 * FACTOR;

export const navLinks: NavLink[] = [
	{ href: "#hero", label: "Ana Sayfa" },
	{ href: "#features", label: "Özellikler" },
	{ href: "#solutions", label: "Çözümler" },
	{ href: "/hakkimizda", label: "Hakkımızda" },
];

export const footerLinks: FooterLink[] = [
	{ label: "Hakkımızda", href: "/hakkimizda" },
	{ href: "#features", label: "Özellikler" },
	{ href: "#solutions", label: "Çözümler" },
];

export const FooterDescription : string = "Türkiye şarj ağını tek bir haritada birleştirerek elektrikli araç yolculuklarını kolaylaştırıyoruz."

type SocialLink = {
	url: string;
};

export const socialLinks: SocialLink[] = [
	{ url: "https://www.instagram.com/charzapp?igsh=c29tNGs1dms4enoy&utm_source=qr" },
	{ url: "https://tiktok.com/" },
	{ url: "https://x.com/home" },
	{ url: "https://www.youtube.com/" },
	{ url: "https://facebook.com/61583870016251" },
	{ url: "https://www.linkedin.com/company/charz" },
];

export const heroData: HeroData = {
	headline: "Kesintisiz Yolculuğun Güvencesi",
	subtext: "Charz’ın tek harita üzerinde birleştirdiği istasyon verileri ve akıllı önerileriyle, rotalarınızı güvenle yönetin.",
	primaryCta: {
		text: "İstasyon Bul",
		href: "#",
	},
	secondaryCta: {
		text: "Daha Fazla Bilgi",
		href: "/hakkimizda",
	},
	appDownload: {
		stores: [
			{
				href: "https://scan.charz.com.tr?ref=website_android",
				ariaLabel: "Google Play'den edinin",
				imageSrc: "/PlayStore.svg",
				alt: "Charz Google Play'den İndir",
				width: IMAGE_WIDTH,
				height: IMAGE_HEIGHT,
			},
			{
				href: "https://scan.charz.com.tr?ref=website_ios",
				ariaLabel: "App Store'dan indirin",
				imageSrc: "/AppStore.svg",
				alt: "Charz App Store'dan İndir",
				width: IMAGE_WIDTH,
				height: IMAGE_HEIGHT,
			},
		],
	},
};

export const solutionsData: Solution[] = [
	{
		icon: "Map",
		title: "Şarj Haritası",
		description: "Charz uygulamasının şarj haritası ile tüm istasyonları ve konumları kolayca arayabilir, AC/DC soket tipine ve istasyon puanına göre filtreleme yapabilirsiniz. Harita üzerindeki noktalar istasyon sayılarını gösterirken, yakınlaştırarak AC/DC için farklı ikonlarla dilediğiniz istasyonu rahatlıkla bulabilirsiniz.",
		image: "/sarj-haritasi.png",
	},
	{
		icon: "CreditCard",
		title: "Rota Planlayıcı",
		description: "Charz’ın yapay zekâ destekli rota planlayıcısı, batarya seviyenizi ve şarj ihtiyaçlarınızı dikkate alarak en hızlı ve en verimli güzergâhı sizin için hazırlar.",
		image: "/rota-planlayici.png",
	},
	{
		icon: "BarChart3",
		title: "Uygulama İçi Navigasyon",
		description: "Charz, size en uygun güzergâhı sunar. Rota üzerindeki şarj duraklarını anlık olarak görebilir, mesafe ve süre bilgilerini takip edebilirsiniz.",
		image: "/uygulama-ici-navigasyon.png",
	},
];


export const bubblesData: Bubble[] = [
	{ text: "Tüm şarj istasyonlarını tek uygulamada görmek muhteşem.", offset: "lg:ml-8" },
	{ text: "İstasyondaki soketlerin anlık müsaitlik durumunu görmek harika bir olay.", offset: "lg:ml-0" },
	{ text: "Akıllı rota planlama özelliğiyle şarjı dert etmeden özgürce seyahat ediyorum.", offset: "lg:ml-12" },
	{ text: "Charz güvencesiyle kart bilgilerimi her defasında girmekten kurtuldum.", offset: "lg:mr-4" },
	{ text: "Onlarca farklı uygulama indirip her birine üye olma derdim kalmadı.", offset: "lg:mr-12" },
	{ text: "Nihayet kullanımı bu kadar basit bir uygulama yapılmış.", offset: "lg:mr-0" },
];

export const solutionsBubblesData: Bubble[] = [
	{ text: "Her şarj markası için ayrı uygulama indirmekten sıkıldım 😒", offset: "lg:ml-8" },
	{ text: "Acaba istasyonda müsait soket var mıdır? 🟠", offset: "lg:ml-0" },
	{ text: "Uygulamaların gelişmiş bir rota planlayıcısı bulunmuyor.", offset: "lg:ml-12" },
	{ text: "Her bir uygulamaya kredi kartı tanımlamak ne kadar güvenli? 🤔", offset: "lg:mr-4" },
	{ text: "Keşke tüm şarj istasyonlarını gösteren bir uygulama olsa ✨", offset: "lg:mr-12" },
	{ text: "Kullanımı basit bir uygulama yok mu piyasada?", offset: "lg:mr-0" },
];

export const FeaturesSectionTitle : string = "Charz ile Tanışın: Özelliklerimiz!"

export const ProblemsSectionTitle : string = "Sıkça Karşılaşılan Sorunlar ve Çözümümüz"
export const FeaturesSectionDescription : string = "Elektrikli araç şarj sürecinde yaşanan zorlukları ortadan kaldırıyor, kullanıcılarımıza tek bir platformda özgür ve kolay bir deneyim sunuyoruz."

export const SolutionsSectionTitle : string = "Problem ve Çözümler"
export const SolutionsSectionDescription : string = "Elektrikli araç kullanıcılarının ortak sorunlarına getirdiğimiz yenilikçi ve pratik çözümlerle tanışın"

export const PartnersSectionTitle : string = "Canlı Veri Paylaşımı Yaptığımız Operatörler"
