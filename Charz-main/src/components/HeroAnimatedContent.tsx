"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HeroData } from "@/types";

type HeroAnimatedContentProps = {
	heroData: HeroData;
};

function HeroAnimatedContent({ heroData }: HeroAnimatedContentProps) {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
		visible: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: {
				duration: 0.8,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};

	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center text-center max-w-6xl mx-auto px-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={itemVariants} className="mb-8">
				<span className="inline-flex items-center gap-x-2 rounded-full border border-lime-500/20 bg-lime-500/5 px-4 py-1.5 text-sm font-medium text-lime-300 backdrop-blur-md shadow-[0_0_15px_rgba(132,204,22,0.3)]">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
					</span>
					Charz Mobil Uygulaması Yayında
				</span>
			</motion.div>

			<motion.h1
				className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl drop-shadow-2xl"
				variants={itemVariants}
			>
				<span className="bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent">
					{heroData.headline}
				</span>
			</motion.h1>

			<motion.p
				className="mt-8 max-w-2xl text-xl leading-8 text-gray-300/90 font-light"
				variants={itemVariants}
			>
				{heroData.subtext}
			</motion.p>

			<motion.div
				className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
				variants={itemVariants}
			>
				{heroData.appDownload.stores.map((store) => (
					<Link
						key={store.alt}
						href={store.href}
						aria-label={store.ariaLabel}
						className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm transition-transform hover:-translate-y-1 active:translate-y-0"
					>
						<div className="absolute inset-0 flex items-center [container-type:inline-size]">
							<div className="absolute h-[100cqw] w-[100cqw] scale-[5] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"></div>
						</div>
						<div className="relative flex items-center gap-2 bg-neutral-950/70 p-4 rounded-[10px]">
							<Image
								src={store.imageSrc}
								alt={store.alt}
								width={store.width * 0.9}
								height={store.height * 0.9}
								className="opacity-90 group-hover:opacity-100 transition-opacity"
							/>
						</div>
					</Link>
				))}
			</motion.div>

			<motion.div
				variants={itemVariants}
				className="absolute -bottom-32 left-1/2 -translate-x-1/2 cursor-pointer"
			>
				<div className="flex flex-col items-center gap-2">
					<span className="text-[10px] uppercase tracking-widest text-neutral-500">Keşfet</span>
					<div className="h-12 w-7 rounded-full border-2 border-white/20 p-1 backdrop-blur-sm">
						<div className="h-2.5 w-full mt-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)] animate-bounce" />
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default HeroAnimatedContent;