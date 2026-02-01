"use client";

import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialIcon } from "react-social-icons";

import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import { FooterDescription, footerLinks, socialLinks } from "@/lib/data";

function Footer(): JSX.Element {
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();

	return (
		<footer className="border-t border-gray-100 bg-white text-neutral-600">
			<Container>
				<div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
					<div className="flex flex-col gap-y-12 lg:flex-row lg:items-start lg:justify-between">

						<div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-md">
							<Link href="/" aria-label="Charz Anasayfa" className="transition-opacity hover:opacity-80">
								<Logo color="#1A1A2E" className="h-8 w-auto" />
							</Link>
							<p className="mt-6 text-base leading-7 text-neutral-500">
								{FooterDescription}
							</p>
							
							<nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-start">
								{footerLinks.map((link) => {
									const isHomePage = pathname === "/";
									const isHashLink = link.href.startsWith("#");
									const finalHref =
										!isHomePage && isHashLink ? `/${link.href}` : link.href;

									return (
										<Link
											key={link.href}
											href={finalHref}
											className="text-sm font-semibold leading-6 text-neutral-900 transition-colors hover:text-lime-600"
										>
											{link.label}
										</Link>
									);
								})}
							</nav>

							<div className="mt-8 text-sm leading-6 text-neutral-400">
								<p>42 Maslak, Maslak Mah., Ahi Evran Cd. Sarıyer, İstanbul</p>
							</div>
							
							<div className="mt-8 flex gap-x-4">
								{socialLinks.map((link) => (
									<SocialIcon
										key={link.url}
										url={link.url}
										target="_blank"
										rel="noopener noreferrer"
										bgColor="transparent"
										fgColor="#1f2937"   
										className="transition-transform hover:scale-110 hover:!fg-lime-600 opacity-80 hover:opacity-100"
										style={{ height: 36, width: 36 }}
									/>
								))}
							</div>
						</div>
						
						<div className="flex flex-col items-center gap-y-8 lg:items-end">
							
							<Link
								href="mailto:info@charz.com.tr"
								className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-8 py-3 font-medium text-white shadow-lg shadow-neutral-200 transition-all duration-300 hover:bg-lime-500 hover:text-neutral-950 hover:shadow-lime-500/30"
							>
								<span className="mr-2 text-xl">👋</span>
								info@charz.com.tr
							</Link>

							<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
								<div
									className="rounded-2xl bg-white p-2 shadow-xl shadow-gray-100 border border-gray-50">
									<Image
										src="/charz-qrcode.svg"
										alt="Uygulamayı indirmek için QR kodu"
										width={130}
										height={130}
										quality={100}
										className="rounded-lg mix-blend-multiply"
									/>
								</div>

								<div className="flex flex-col gap-3">
									<Link
										href="https://scan.charz.com.tr?ref=website_ios"
										aria-label="App Store'dan indir"
										className="transition-transform hover:scale-105"
									>
										<div className="overflow-hidden rounded-[10px] bg-black shadow-md">
											<Image
												src="/AppStore.svg"
												alt="App Store"
												width={140}
												height={46}
												className="opacity-100"
											/>
										</div>
									</Link>
									<Link
										href="https://scan.charz.com.tr?ref=website_android"
										aria-label="Google Play'den indir"
										className="transition-transform hover:scale-105"
									>
										<div className="overflow-hidden rounded-[10px] bg-black shadow-md">
											<Image
												src="/PlayStore.svg"
												alt="Google Play"
												width={140}
												height={46}
												className="opacity-100"
											/>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div
						className="mt-16 flex flex-col-reverse items-center gap-y-4 border-t border-gray-100 pt-8 sm:flex-row sm:justify-between"
					>
						<p className="text-xs leading-5 text-neutral-400">
							&copy; {currentYear} Charz. Tüm hakları saklıdır.
						</p>

						<nav className="flex items-center gap-x-6">
							<Link
								href="/agreements/kullanim-kosullari"
								className="text-xs leading-5 text-neutral-500 transition-colors hover:text-lime-600"
							>
								Kullanıcı Sözleşmesi
							</Link>
							<Link
								href="/agreements/gizlilik-politikasi"
								className="text-xs leading-5 text-neutral-500 transition-colors hover:text-lime-600"
							>
								Gizlilik Sözleşmesi
							</Link>
						</nav>

					</div>
				</div>
			</Container>
		</footer>
	);
}

export default Footer;