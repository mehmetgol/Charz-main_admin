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
	title: "Charz",
	description: "Charz Akıllı İstasyonlar",
	icons: {
		icon: "/logo.png",
	}
};

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`${manrope.variable} antialiased`}>
		<Header invertTextColor={true}/>
		{children}
		<Footer/>
		</body>
		</html>
	);
}