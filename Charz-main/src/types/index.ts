import {JSX} from "react";

export type NavLink = {
	href: string;
	label: string;
};

export type AppStoreLink = {
	href: string;
	ariaLabel: string;
	imageSrc: string;
	alt: string;
	width: number;
	height: number;
};

export type HeroData = {
	headline: string;
	subtext: string;
	primaryCta: {
		text: string;
		href: string;
	};
	secondaryCta: {
		text: string;
		href: string;
	};
	appDownload: {
		stores: AppStoreLink[];
	};
};


export type Solution = {
	icon: string;
	title: string;
	description: string;
	image: string;
};

export type Bubble = {
	text: string;
	offset?: string;
}

export type FooterLink = {
	label: string;
	href: string;
};

export type SocialLink = {
	name: string;
	href: string;
	icon: JSX.Element;
};
