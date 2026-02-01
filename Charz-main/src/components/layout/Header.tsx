"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	motion,
	useScroll,
	useMotionValueEvent,
	AnimatePresence,
	type Variants,
} from "framer-motion";

import Container from "@/components/layout/Container";
import { navLinks } from "@/lib/data";
import Logo from "@/components/layout/Logo";

type HeaderProps = {
	invertTextColor?: boolean;
};

function Header({ invertTextColor = false }: HeaderProps): JSX.Element {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState<boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest: number): void => {
		setScrolled(latest > 20);
	});

	useEffect((): (() => void) => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return (): void => {
			document.body.style.overflow = "auto";
		};
	}, [isMenuOpen]);

	const toggleMenu = (): void => {
		setIsMenuOpen((prev: boolean): boolean => !prev);
	};

	const linkColorClass = scrolled
		? "text-gray-200 hover:text-lime-400"
		: invertTextColor
			? "text-slate-900 hover:text-lime-600" 
			: "text-white hover:text-lime-400"; 

	let menuButtonColor: string;
	if (isMenuOpen) {
		menuButtonColor = "#FFFFFF"; 
	} else {
		menuButtonColor = scrolled
			? "#FFFFFF" 
			: invertTextColor
				? "#0f172a" 
				: "#FFFFFF";
	}

	const logoColor = scrolled
		? "#FFFFFF" // Scrolled: Hep beyaz
		: invertTextColor
			? "#0f172a"
			: "#FFFFFF";

	const headerContainerVariants: Variants = {
		top: {
			backgroundColor: "rgba(255, 255, 255, 0)",
			backdropFilter: "blur(0px)",
			borderRadius: "0px",
			paddingLeft: "0px",
			paddingRight: "0px",
			border: "1px solid rgba(255, 255, 255, 0)",
			boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
			y: 0,
			width: "100%",
		},
		scrolled: {
			backgroundColor: "rgba(15, 23, 42, 0.85)",
			backdropFilter: "blur(16px)",
			borderRadius: "9999px",
			paddingLeft: "24px",
			paddingRight: "24px",
			border: "1px solid rgba(255, 255, 255, 0.1)", 
			boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
			y: 10, 
			width: "100%",
		},
	};

	const desktopNavListVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const desktopNavItemVariants: Variants = {
		hidden: { opacity: 0, y: -10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				ease: "easeOut",
			},
		},
	};

	const mobileMenuVariants: Variants = {
		hidden: {
			opacity: 0,
			clipPath: "circle(0% at 100% 0)",
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30
			},
		},
		visible: {
			opacity: 1,
			clipPath: "circle(150% at 100% 0)",
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 30
			},
		},
		exit: {
			opacity: 0,
			clipPath: "circle(0% at 100% 0)",
			transition: {
				duration: 0.5,
				ease: "easeInOut"
			}
		}
	};

	const mobileNavListVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const mobileNavItemVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				ease: "easeOut",
			},
		},
	};

	return (
		<>
			<header className="fixed left-0 top-0 z-50 w-full py-4 transition-all duration-300">
				<Container>
					<motion.div
						className="flex h-16 items-center justify-between"
						variants={headerContainerVariants}
						animate={scrolled ? "scrolled" : "top"}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom Bezier for fluidity
					>
						<Link
							href="/"
							aria-label="Anasayfa"
							className="z-50 pl-2 lg:pl-0"
						>
							<Logo color={logoColor} className="transition-colors duration-300" />
						</Link>

						<nav className="hidden pr-2 md:block lg:pr-0">
							<motion.ul
								className="flex items-center gap-x-8"
								variants={desktopNavListVariants}
								initial="hidden"
								animate="visible"
							>
								{navLinks.map((link) => {
									const isHomePage = pathname === "/";
									const isHashLink = link.href.startsWith("#");
									const finalHref =
										!isHomePage && isHashLink ? `/${link.href}` : link.href;

									return (
										<motion.li key={link.href} variants={desktopNavItemVariants}>
											<Link
												href={finalHref}
												className={`font-medium tracking-wide transition-all duration-300 ${linkColorClass}`}
											>
												{link.label}
											</Link>
										</motion.li>
									);
								})}

								<motion.li variants={desktopNavItemVariants}>
									<Link
										href="#"
										className={`ml-4 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
											scrolled
												? "bg-lime-400 text-black hover:bg-lime-500"
												: invertTextColor
													? "bg-slate-900 text-white hover:bg-slate-800"
													: "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/20"
										}`}
									>
										İndir
									</Link>
								</motion.li>
							</motion.ul>
						</nav>

						<div className="z-50 pr-2 md:hidden">
							<MenuButton
								isOpen={isMenuOpen}
								onClick={toggleMenu}
								color={menuButtonColor}
							/>
						</div>
					</motion.div>
				</Container>
			</header>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="fixed inset-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-neutral-950 text-white"
						variants={mobileMenuVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
							<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-lime-500/30 rounded-full blur-[100px]" />
							<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/30 rounded-full blur-[100px]" />
						</div>

						<motion.ul
							className="relative flex flex-col items-center gap-y-8"
							variants={mobileNavListVariants}
						>
							{navLinks.map((link) => {
								const isHomePage = pathname === "/";
								const isHashLink = link.href.startsWith("#");
								const finalHref =
									!isHomePage && isHashLink ? `/${link.href}` : link.href;

								return (
									<motion.li key={link.href} variants={mobileNavItemVariants}>
										<Link
											href={finalHref}
											className="text-4xl font-bold tracking-tight text-white transition-colors duration-300 hover:text-lime-400"
											onClick={toggleMenu}
										>
											{link.label}
										</Link>
									</motion.li>
								);
							})}
							<motion.li variants={mobileNavItemVariants} className="mt-8">
								<Link
									href="#"
									className="rounded-full bg-lime-400 px-8 py-3 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95"
									onClick={toggleMenu}
								>
									Uygulamayı İndir
								</Link>
							</motion.li>
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

type MenuButtonProps = {
	isOpen: boolean;
	onClick: () => void;
	color: string;
};

function MenuButton({ isOpen, onClick, color }: MenuButtonProps): JSX.Element {
	const lineVariants: Variants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: 45, translateY: 0 },
	};

	const middleLineVariants: Variants = {
		closed: { opacity: 1, scale: 1 },
		open: { opacity: 0, scale: 0 },
	};

	const bottomLineVariants: Variants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: -45, translateY: 0 },
	};

	return (
		<button
			onClick={onClick}
			className="group flex h-10 w-10 flex-col items-center justify-center gap-y-[6px] rounded-full transition-colors hover:bg-white/10"
			aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
			aria-expanded={isOpen}
		>
			<motion.span
				className="h-0.5 w-6 rounded-full origin-center"
				style={{ backgroundColor: color }}
				variants={lineVariants}
				animate={isOpen ? "open" : "closed"}
				initial="closed"
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
			<motion.span
				className="h-0.5 w-6 rounded-full origin-center"
				style={{ backgroundColor: color }}
				variants={middleLineVariants}
				animate={isOpen ? "open" : "closed"}
				initial="closed"
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
			<motion.span
				className="h-0.5 w-6 rounded-full origin-center"
				style={{ backgroundColor: color }}
				variants={bottomLineVariants}
				animate={isOpen ? "open" : "closed"}
				initial="closed"
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
		</button>
	);
}

export default Header;