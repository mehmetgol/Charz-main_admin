"use client";

import { JSX } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import Container from "@/components/layout/Container";

type Partner = {
	name: string;
	logoSrc: string;
};

const partners: Partner[] = [
	{ name: "5s Şarj", logoSrc: "/partners/5sarj.png" },
	{ name: "AKM Charge", logoSrc: "/partners/akmcharge.png" },
	{ name: "Aksa Şarj", logoSrc: "/partners/aksa.png" },
	{ name: "Aktif Şarj", logoSrc: "/partners/aktifsarj.png" },
	{ name: "AutoVolt", logoSrc: "/partners/autovolt.png" },
	{ name: "B-Charge", logoSrc: "/partners/bcharge.png" },
	{ name: "Beefull", logoSrc: "/partners/beefull.png" },
	{ name: "E-Fish", logoSrc: "/partners/efish.png" },
	{ name: "En Yakıt", logoSrc: "/partners/enyakit.png" },
	{ name: "Eşarj", logoSrc: "/partners/esarj.png" },
	{ name: "Magicline", logoSrc: "/partners/magicline.png" },
	{ name: "Powerşarj", logoSrc: "/partners/powersarj.png" },
	{ name: "Sharznet", logoSrc: "/partners/sharznet.png" },
	{ name: "Tesla", logoSrc: "/partners/tesla.png" },
	{ name: "Tora Şarj", logoSrc: "/partners/tora.png" },
	{ name: "Trugo", logoSrc: "/partners/trugo.png" },
	{ name: "Voltrun", logoSrc: "/partners/voltrun.png" },
	{ name: "Watt", logoSrc: "/partners/watt.png" },
	{ name: "ZES", logoSrc: "/partners/zes.png" },
];

export default function PartnersSection(): JSX.Element {
	const [emblaRef] = useEmblaCarousel(
		{ loop: true, dragFree: true },
		[
			AutoScroll({
				playOnInit: true,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
				speed: 1,
			}),
		]
	);

	return (
		<section className="bg-gray-100 py-16 sm:py-24 border-t border-gray-200">
			<Container>
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					<div className="relative">
						<div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-gray-100 via-transparent to-gray-100" />

						<div className="embla overflow-hidden" ref={emblaRef}>
							<div className="embla__container flex items-center gap-8 sm:gap-12">
								{partners.map((partner, index) => (
									<div
										key={`${partner.name}-${index}`}
										className="embla__slide relative h-16 w-32 flex-none sm:h-20 sm:w-40"
									>
										<div className="group relative h-full w-full flex items-center justify-center">
											<Image
												src={partner.logoSrc}
												alt={partner.name}
												fill
												sizes="(max-width: 768px) 128px, 160px"
												className="object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}