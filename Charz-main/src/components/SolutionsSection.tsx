"use client";

import { JSX } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import {solutionsBubblesData, SolutionsSectionDescription, SolutionsSectionTitle} from "@/lib/data";
import Container from "@/components/layout/Container";
import {Bubble} from "@/types";

function ProblemBubble({ text, offset = "" }: Bubble): JSX.Element {
	return (
		<div
			className={`relative w-fit max-w-[280px] rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium leading-6 text-white shadow-lg ${offset}`}
		>
			{text}
		</div>
	);
}

export default function SolutionsSection(): JSX.Element {
	const leftBubbles = solutionsBubblesData.slice(0, 3);
	const rightBubbles = solutionsBubblesData.slice(3, 6);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	return (
		<section id="solutions" className="overflow-x-hidden py-8 sm:py-28">
			<Container>
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						{SolutionsSectionTitle}
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						{SolutionsSectionDescription}
					</p>
				</div>

				<div className="mt-20 grid grid-cols-1 items-center gap-y-16 lg:grid-cols-3 lg:gap-x-8">
					<motion.div
						className="hidden flex-col gap-y-12 lg:flex lg:items-start"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						{leftBubbles.map((bubble) => (
							<motion.div key={bubble.text} variants={itemVariants}>
								<ProblemBubble text={bubble.text} offset={bubble.offset} />
							</motion.div>
						))}
					</motion.div>

					<div className="order-first flex justify-center lg:order-none">
						<Image
							src="/mockup-1.png"
							alt="Mobil Uygulama Arayüzü"
							width={320}
							height={650}
							quality={100}
							priority
						/>
					</div>

					<motion.div
						className="flex flex-col gap-y-8 lg:hidden"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						{solutionsBubblesData.map((bubble, index) => (
							<motion.div
								key={bubble.text}
								variants={itemVariants}
								className={`flex w-full ${
									index % 2 === 0 ? "justify-start" : "justify-end"
								}`}
							>
								<ProblemBubble text={bubble.text} />
							</motion.div>
						))}
					</motion.div>

					<motion.div
						className="hidden flex-col gap-y-12 lg:flex lg:items-end"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						{rightBubbles.map((bubble) => (
							<motion.div key={bubble.text} variants={itemVariants}>
								<ProblemBubble text={bubble.text} offset={bubble.offset} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</Container>
		</section>
	);
}