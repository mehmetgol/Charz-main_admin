import Container from "@/components/layout/Container";
import HeroAnimatedContent from "@/components/HeroAnimatedContent";
import { heroData } from "@/lib/data";

function Home() {
	return (
		<main>
			<section
				id="hero"
				className="relative flex h-screen items-center justify-center overflow-hidden"
			>
				<video
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					className="absolute left-0 top-0 z-0 h-full w-full object-cover"
				>
					<source
						src="/video.webm"
						type="video/webm"
					/>
					Tarayıcınız video etiketini desteklemiyor.
				</video>

				<div
					aria-hidden="true"
					className="absolute inset-0 z-[1] bg-black/75"
				/>

				<Container className="relative z-10">
					<HeroAnimatedContent heroData={heroData} />
				</Container>
			</section>
		</main>
	);
}

export default Home;