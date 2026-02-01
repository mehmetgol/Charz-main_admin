"use client";

import React, { JSX, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Zap, CreditCard } from "lucide-react";
import Container from "@/components/layout/Container";

type TiltCardProps = {
	icon: React.ElementType;
	title: string;
	description: string;
	isComingSoon?: boolean;
};

const TiltCard = ({ icon: Icon, title, description, isComingSoon }: TiltCardProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.5deg)`;
	const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.5deg)`;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		x.set(xPct * 20);
		y.set(yPct * 20);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className="relative h-full w-full rounded-3xl bg-slate-50 border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
		>
			<div
				style={{ transform: "translateZ(50px)" }}
				className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-lime-400/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
			/>

			{isComingSoon && (
				<div
					className="absolute right-4 top-4 rounded-full bg-lime-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-lime-800 border border-lime-200"
					style={{ transform: "translateZ(20px)" }}
				>
					Yakında
				</div>
			)}

			<div style={{ transform: "translateZ(30px)" }}
				 className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
				<Icon className="h-8 w-8 text-lime-400" />
			</div>

			<h3 style={{ transform: "translateZ(20px)" }}
				className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors">
				{title}
			</h3>
			<p style={{ transform: "translateZ(10px)" }} className="mt-4 text-lg leading-7 text-slate-600">
				{description}
			</p>
		</motion.div>
	);
};

export default function HowToUseSection(): JSX.Element {
	const steps = [
		{
			icon: MapPin,
			title: "İstasyon Bul",
			description: "Harita üzerinden size en yakın veya rotanız üzerindeki şarj istasyonlarını anlık müsaitlik durumlarıyla birlikte kolayca bulun."
		},
		{
			icon: Zap,
			title: "Şarj Et & Yönet",
			description: "QR kodu okutarak veya istasyon numarasını girerek şarj işlemini saniyeler içinde başlatın. Şarj sürecini anlık olarak takip edin."
		},
		{
			icon: CreditCard,
			title: "Güvenle Öde",
			description: "Uygulamaya bir kez tanımlayacağınız kredi kartınız ile tüm markalarda hızlı ve güvenli ödeme çok yakında sizlerle.",
			isComingSoon: true
		}
	];

	return (
		<section id="how-to-use" className="overflow-hidden bg-white py-24 sm:py-32">
			<Container>
				<div className="mx-auto max-w-4xl text-center mb-20">
					<span className="text-lime-600 font-semibold tracking-wider uppercase text-sm">Kolay Kullanım</span>
					<h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
						Charz Nasıl Çalışır?
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 perspective-1000">
					{steps.map((step, i) => (
						<TiltCard key={i} {...step} />
					))}
				</div>
			</Container>
		</section>
	);
}