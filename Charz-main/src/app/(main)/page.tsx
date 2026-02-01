import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemsSection from "@/components/ProblemsSection";
import PartnersSection from "@/components/PartnersSection";
import HowToUseSection from "@/components/HowToUseSection";

export default function Home() {
	return (
		<>
			<HeroSection/>
			<HowToUseSection/>
			<FeaturesSection/>
			<ProblemsSection/>
			<PartnersSection/>
		</>
	);
}
