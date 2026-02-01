"use client";

import { JSX } from "react";
import { motion, type Variants } from "framer-motion";
import { X, Check, ArrowDown } from "lucide-react"; // Lucide ikonlarını kullanıyoruz

import Container from "@/components/layout/Container";

type Feature = {
	problem: string;
	solution: string;
};

type FeatureCardProps = {
	problem: string;
	solution: string;
};

// --- Yeni Nesil Kart Bileşeni ---
function FeatureCard({ problem, solution }: FeatureCardProps): JSX.Element {
	return (
		<div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-lime-500/30 hover:bg-neutral-900/80 hover:shadow-[0_0_30px_-10px_rgba(132,204,22,0.15)]">

			{/* Dekoratif Glow Efekti */}
			<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:bg-lime-500/10" />

			{/* --- PROBLEM KISMI (Üst) --- */}
			<div className="relative z-10 flex gap-4 opacity-70 transition-all duration-500 group-hover:opacity-40 group-hover:blur-[0.5px]">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
					<X size={20} />
				</div>
				<p className="text-base font-medium leading-relaxed text-neutral-300">
					{problem}
				</p>
			</div>

			{/* --- BAĞLAÇ (Ok) --- */}
			<div className="relative z-10 my-6 flex justify-center opacity-20 transition-all duration-500 group-hover:opacity-100 group-hover:text-lime-500">
				<ArrowDown size={24} className="animate-bounce" style={{ animationDuration: '2s' }} />
			</div>

			{/* --- ÇÖZÜM KISMI (Alt - Vurgulu) --- */}
			<div className="relative z-10 flex flex-1 gap-4">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-500/10 text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.2)] ring-1 ring-lime-500/20 transition-all duration-500 group-hover:bg-lime-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.5)]">
					<Check size={20} strokeWidth={3} />
				</div>
				<p className="text-lg font-bold leading-relaxed text-white group-hover:text-lime-50 group-hover:drop-shadow-sm">
					{solution}
				</p>
			</div>
		</div>
	);
}

export default function ProblemsSection(): JSX.Element {
	const features: Feature[] = [
		{
			problem: "Birden fazla uygulama indirmek zaman kaybettiriyor.",
			solution: "Tek bir uygulama ile tüm şarj ağlarına erişim özgürlüğü."
		},
		{
			problem: "Gelişmiş rota planlama araçları doğru konum bilgisi veremiyor.",
			solution: "Yapay zeka destekli algoritma ile %99 doğrulukla en verimli rotayı çizin."
		},
		{
			problem: "İstasyonlarda anlık durum bilgisinin yer almaması sürpriz yaratıyor.",
			solution: "Canlı veri akışı sayesinde soketlerin doluluk durumunu gitmeden görün."
		},
		{
			problem: "Yeni başlayanlar için karmaşık ve anlaşılmaz arayüzler.",
			solution: "Her yaş ve deneyim grubu için tasarlanmış minimalist ve sezgisel tasarım."
		},
		{
			problem: "Her uygulama için ayrı kart tanımlamak ve ödeme yapmak yorucu.",
			solution: "Tek cüzdan, tek kart. Charz üzerinden tüm operatörlerde güvenle ödeyin."
		},
		{
			problem: "Geçmiş şarj ve ödeme takibinin zorluğu.",
			solution: "Tüm harcama ve şarj geçmişiniz tek ekranda, detaylı raporlarla elinizin altında."
		}
	];

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<section id="solutions" className="relative overflow-hidden bg-neutral-950 pb-24 sm:pb-32 pt-0 ">
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

			<Container className="relative z-10">
				<div className="mx-auto max-w-3xl text-center">
					<motion.span
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-lime-400 font-semibold tracking-widest uppercase text-sm"
					>
						Sorunsuz Deneyim
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
					>
						Karmaşayı <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">Çözüme</span> Dönüştürüyoruz
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-6 text-xl leading-8 text-neutral-400"
					>
						Elektrikli araç sahipliğinin getirdiği zorlukları biliyoruz. Charz ile bu engelleri ortadan kaldırıp sadece sürüş keyfine odaklanmanızı sağlıyoruz.
					</motion.p>
				</div>

				<motion.div
					className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{features.map((feature) => (
						<motion.div
							key={feature.problem}
							variants={itemVariants}
							className="h-full"
						>
							<FeatureCard
								problem={feature.problem}
								solution={feature.solution}
							/>
						</motion.div>
					))}
				</motion.div>
			</Container>
		</section>
	);
}


/*
"use client";

import {JSX} from "react";
import {motion, type Variants} from "framer-motion";
import {Check, X} from "lucide-react";

import Container from "@/components/layout/Container";

type FeatureCardProps = {
	problem: string;
	solution: string;
};

// --- Yenilenmiş Minimalist Kart ---
function FeatureCard({problem, solution}: FeatureCardProps): JSX.Element {
	return (
		<div
			className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-lime-500/30 hover:bg-slate-900/80 hover:shadow-[0_0_40px_-10px_rgba(163,230,53,0.1)]">

			{/!* Arka Plandaki Dev Silik İkon *!/}
			<div
				className="absolute -right-4 -bottom-4 rotate-12 text-lime-500/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-lime-500/10">
				<Check size={180} strokeWidth={1.5}/>
			</div>

			{/!* Üst Kısım: ÇÖZÜM (Vurgulu) *!/}
			<div className="relative z-10">
				<div className="flex items-center gap-3 mb-4">
					<div
						className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500/20 text-lime-400 ring-1 ring-lime-500/30">
						<Check size={16} strokeWidth={3}/>
					</div>
					<span className="text-xs font-bold uppercase tracking-wider text-lime-500">Çözüm</span>
				</div>
				<p className="text-xl font-bold leading-relaxed text-white group-hover:text-lime-100">
					{solution}
				</p>
			</div>

			{/!* Ayırıcı Çizgi *!/}
			<div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent"/>

			{/!* Alt Kısım: PROBLEM (Silik) *!/}
			<div className="relative z-10 flex gap-3 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
				<X size={20} className="mt-1 shrink-0 text-red-400"/>
				<p className="text-sm font-medium leading-relaxed text-slate-300">
					<span className="block text-xs text-red-400 uppercase tracking-wide mb-1">Karşılaşılan Sorun</span>
					{problem}
				</p>
			</div>
		</div>
	);
}

export default function ProblemsSection(): JSX.Element {
	// Features verisi ve Variants aynı kalabilir
	const features = [
		{
			problem: "Birden fazla uygulama indirmek zaman kaybettiriyor.",
			solution: "Tek bir uygulama ile tüm şarj ağlarına erişim özgürlüğü."
		},
		{
			problem: "Rota planlama araçları doğru konum bilgisi veremiyor.",
			solution: "Yapay zeka destekli %99 doğru rota planlama."
		},
		{
			problem: "İstasyonlarda anlık durum bilgisi sürpriz yaratıyor.",
			solution: "Canlı veri akışı ile gitmeden doluluk durumunu görün."
		},
		{problem: "Karmaşık ve anlaşılmaz arayüzler.", solution: "Her yaş grubu için minimalist ve sezgisel tasarım."},
		{
			problem: "Her uygulama için ayrı kart tanımlamak yorucu.",
			solution: "Tek cüzdan ile tüm operatörlerde güvenli ödeme."
		},
		{
			problem: "Geçmiş şarj ve ödeme takibinin zorluğu.",
			solution: "Tüm harcamalarınız ve şarj geçmişiniz tek ekranda."
		}
	];

	const containerVariants: Variants = {
		hidden: {opacity: 0},
		visible: {opacity: 1, transition: {staggerChildren: 0.1}},
	};

	const itemVariants: Variants = {
		hidden: {opacity: 0, y: 30},
		visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}},
	};

	return (
		<section className="relative overflow-hidden bg-slate-950 pb-24 sm:pb-32 pt-0">
			<Container className="relative z-10">
				<div className="mx-auto max-w-3xl text-center">
					<motion.span
						initial={{opacity: 0, y: 10}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						className="text-lime-400 font-bold tracking-widest uppercase text-sm"
					>
						Deneyim Odaklı
					</motion.span>
					<motion.h2
						initial={{opacity: 0, y: 10}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{delay: 0.1}}
						className="mt-3 text-3xl font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl"
					>
						Karmaşayı <span
						className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">Çözüme</span> Dönüştürüyoruz
					</motion.h2>
				</div>

				<motion.div
					className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{once: true, amount: 0.1}}
				>
					{features.map((feature) => (
						<motion.div key={feature.problem} variants={itemVariants} className="h-full">
							<FeatureCard problem={feature.problem} solution={feature.solution}/>
						</motion.div>
					))}
				</motion.div>
			</Container>
		</section>
	);
}*/
