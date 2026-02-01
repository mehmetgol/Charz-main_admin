"use client";

import { useCallback, useEffect, useState, type JSX } from "react";
import Image from "next/image";
import { type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	BarChart3,
	Map,
	type LucideProps,
	Route
} from "lucide-react";

import { FeaturesSectionTitle, solutionsData } from "@/lib/data";
import Container from "@/components/layout/Container";
import { type Solution } from "@/types";

type IconMap = {
	[key: string]: (props: LucideProps) => JSX.Element;
};

const ICONS: IconMap = {
	Map: (props: LucideProps): JSX.Element => <Map {...props} />,
	CreditCard: (props: LucideProps): JSX.Element => <Route {...props} />,
	BarChart3: (props: LucideProps): JSX.Element => <BarChart3 {...props} />,
};

const imageVariants: Variants = {
	hidden: { opacity: 0, x: 20, scale: 0.95, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: "easeOut" }
	},
	exit: {
		opacity: 0,
		x: -20,
		scale: 0.95,
		filter: "blur(4px)",
		transition: { duration: 0.3, ease: "easeIn" }
	},
};

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

export default function FeaturesSection(): JSX.Element {
	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
		Autoplay({ delay: 5000, stopOnInteraction: false }),
	]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const scrollPrev = useCallback((): void => {
		emblaApi?.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback((): void => {
		emblaApi?.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number): void => {
			emblaApi?.scrollTo(index);
		},
		[emblaApi]
	);

	useEffect((): (() => void) | void => {
		if (!emblaApi) return;
		const onSelect = (): void => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};
		emblaApi.on("select", onSelect);
		onSelect();
		return (): void => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

	return (
		<section id="features" className="relative overflow-hidden bg-neutral-950 py-24 sm:py-32">
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
				 style={{ backgroundImage: noiseBg }}></div>

			<div
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-lime-500/10 blur-[120px] pointer-events-none" />

			<Container className="relative z-10">
				<div className="mx-auto max-w-2xl text-center mb-16 sm:mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-base font-semibold leading-7 text-lime-400"
					>
						Neden Charz?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
					>
						{FeaturesSectionTitle}
					</motion.p>
				</div>

				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
					<div className="w-full lg:w-1/2 flex justify-center items-center relative order-2 lg:order-1">
						<div
							className="absolute inset-0 bg-lime-500/20 blur-[60px] rounded-full scale-75 animate-pulse" />

						<div className="relative w-full max-w-[350px] h-[500px] sm:h-[600px]">
							<AnimatePresence mode="wait">
								<motion.div
									key={selectedIndex}
									variants={imageVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="absolute inset-0 h-full w-full"
								>
									<Image
										src={solutionsData[selectedIndex].image}
										alt={solutionsData[selectedIndex].title}
										fill
										className="object-contain drop-shadow-2xl"
										priority
									/>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					<div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
						<div className="overflow-hidden" ref={emblaRef}>
							<div className="flex">
								{solutionsData.map((solution: Solution) => {
									const IconComponent = ICONS[solution.icon] || Map;

									return (
										<div
											key={solution.title}
											className="min-w-0 flex-shrink-0 flex-grow-0 basis-full px-2"
										>
											<div className="flex flex-col items-start">
												<div
													className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-500/10 border border-lime-500/20 text-lime-400">
													<IconComponent size={32} strokeWidth={1.5} />
												</div>
												<h3 className="text-3xl font-bold text-white sm:text-4xl mb-6">
													{solution.title}
												</h3>
												<p className="text-lg leading-8 text-neutral-400">
													{solution.description}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="mt-12 flex items-center gap-x-6">
							<div className="flex gap-4">
								<button
									onClick={scrollPrev}
									className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all hover:border-lime-500 hover:text-lime-400 active:scale-95"
									aria-label="Önceki"
								>
									<ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
								</button>
								<button
									onClick={scrollNext}
									className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all hover:border-lime-500 hover:text-lime-400 active:scale-95"
									aria-label="Sonraki"
								>
									<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
								</button>
							</div>

							<div className="flex items-center gap-2">
								{solutionsData.map((_, index) => (
									<button
										key={index}
										onClick={() => scrollTo(index)}
										className={`h-2 rounded-full transition-all duration-300 ${
											index === selectedIndex
												? "w-8 bg-lime-400"
												: "w-2 bg-neutral-800 hover:bg-neutral-700"
										}`}
										aria-label={`Slayt ${index + 1}'e git`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}