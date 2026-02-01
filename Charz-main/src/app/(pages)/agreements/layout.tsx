import type {Metadata} from "next";
import {Manrope} from "next/font/google";

import "../../globals.css";
import Header from "@/components/layout/Header";
import React from "react";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Charz - Yasal",
	description: "Charz Akıllı İstasyonlar Yasal Metinler",
	icons: {
		icon: "/logo.png",
	}
};

export default function AgreementsLayout({
											 children,
										 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr">
		<body className={`${manrope.variable} antialiased`}>
		<Header invertTextColor={true}/>
		<main className="bg-slate-50 py-24 sm:py-32">
			{children}
		</main>
		<Footer/>
		</body>
		</html>
	);
}