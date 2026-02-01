"use client";

import type { JSX } from "react";
import Link from "next/link";
import { ChevronRight, Target, Eye, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/layout/Container";

// --- Breadcrumb Bileşeni (Light Mode Uyumlu) ---
type BreadcrumbItem = {
	href: string;
	label: string;
};

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

function Breadcrumb({ items }: BreadcrumbProps): JSX.Element {
	return (
		<nav aria-label="Breadcrumb" className="mb-8">
			<ol className="flex items-center space-x-2 text-sm text-gray-500">
				{items.map((item, index) => (
					<li key={item.href} className="flex items-center">
						{index > 0 && <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0 text-gray-400" />}
						<Link
							href={item.href}
							className={`transition-colors duration-300 ${
								index === items.length - 1
									? "font-semibold text-gray-900 pointer-events-none"
									: "hover:text-lime-600"
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

// --- Bilgi Kartı Bileşeni (Beyaz Kartlar) ---
type InfoCardProps = {
	title: string;
	description: string;
	icon: React.ElementType;
	delay?: number;
};

function InfoCard({ title, description, icon: Icon, delay = 0 }: InfoCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.5 }}
			className="group h-full relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/10"
		>
			<div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-lime-600 ring-1 ring-lime-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-lime-500 group-hover:text-white">
				<Icon size={24} />
			</div>

			<h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
				{title}
			</h3>

			<p className="text-gray-600 leading-relaxed">
				{description}
			</p>

			<div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime-500/5 blur-[50px] transition-all duration-500 group-hover:bg-lime-500/10" />
		</motion.div>
	);
}

export default function AboutPage(): JSX.Element {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ href: "/", label: "Anasayfa" },
		{ href: "/hakkimizda", label: "Hakkımızda" },
	];

	return (
		<main className="relative min-h-screen bg-slate-50 overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none" />
			<div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-lime-200/20 blur-[100px]" />
			<div className="absolute left-0 bottom-20 h-96 w-96 rounded-full bg-blue-200/20 blur-[100px]" />

			<div className="relative z-10 py-24 sm:py-32">
				<Container>
					<Breadcrumb items={breadcrumbItems} />

					<div className="mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
						>
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
								Yolculuğun <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-700">Geleceğini</span> Tasarlıyoruz
							</h1>

							<div className="prose prose-lg prose-slate max-w-none">
								<p className="text-xl leading-9 text-gray-600 font-light">
									<strong className="text-gray-900 font-semibold">Charz</strong>, Türkiye’deki elektrikli araç sürücülerine tek bir platform üzerinden
									güvenilir, erişilebilir ve şeffaf bir şarj deneyimi sunmayı amaçlayan bir mobil uygulamadır.
									Markalardan bağımsız yapısı sayesinde tüm şarj istasyonlarını tek harita üzerinde bir araya
									getirir, istasyonların anlık uygunluk bilgilerini paylaşır ve kullanıcıların yolculuklarını
									daha planlı ve öngörülebilir hale getirir.
								</p>
							</div>
						</motion.div>

						<div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="md:col-span-2 lg:col-span-1">
								<InfoCard
									title="Misyonumuz"
									description="Elektrikli araç kullanıcılarının günlük hayatını kolaylaştırmak ve şarj sürecinde yaşanan belirsizlikleri ortadan kaldırmak. Sürücüler, Charz üzerinden araçlarına uygun istasyonları filtreleyebilir ve rotalarını verimli şekilde planlayabilir."
									icon={Target}
									delay={0.2}
								/>
							</div>

							<div className="md:col-span-2 lg:col-span-1">
								<InfoCard
									title="Vizyonumuz"
									description="Elektrikli araç ekosisteminde güvenilir bir çözüm ortağı olarak, Türkiye’nin sürdürülebilir ulaşım dönüşümüne katkıda bulunmak ve kullanıcıların ilk tercih ettiği teknoloji platformu olmak."
									icon={Eye}
									delay={0.3}
								/>
							</div>

							<div className="md:col-span-2 lg:col-span-1">
								<InfoCard
									title="Özelliklerimiz"
									description="Charz; kapsamlı filtreleme, anlık durum bilgisi, yapay zeka destekli rota planlama ve topluluk paylaşımı gibi özellikleriyle yolculukları daha güvenli, hızlı ve keyifli hale getirir."
									icon={Zap}
									delay={0.4}
								/>
							</div>

							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.5 }}
								className="md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-r from-lime-400 to-lime-500 p-8 text-center shadow-xl shadow-lime-500/20"
							>
								<div className="flex flex-col items-center justify-center gap-4">
									<Activity className="h-12 w-12 text-white" />
									<h3 className="text-2xl font-bold text-white">Sürdürülebilir bir gelecek için çalışıyoruz.</h3>
								</div>
							</motion.div>
						</div>

					</div>

				</Container>
			</div>
		</main>
	);
}