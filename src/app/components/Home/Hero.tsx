"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
	{
		id: 0,
		title: `"YOUR HOME. YOUR STORY. OUR DESIGN"`,
		subtitle:
			"We design interiors that feel personal, warm, and unforgettable.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151955/villa-HD_ywgpac.jpg",
	},
	{
		id: 1,
		title: `"DESIGNS THAT FEEL LIKE YOU"`,
		subtitle:
			"Modern, functional and timeless interiors built around your lifestyle.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151915/pexels-dayvison-de-oliveira-silva-5733617-1920x1280_ckthe0.jpg",
	},
	{
		id: 2,
		title: `"SPACES THAT INSPIRE EVERY DAY"`,
		subtitle:
			"Elegant workspaces & commercial interiors that elevate your brand.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151940/office_tidjvy.jpg",
	},
];

const slideVariants: Variants = {
	enter: {
		x: "100%",
		opacity: 0,
	},
	center: {
		x: "0%",
		opacity: 1,
		transition: { duration: 3, ease: "linear" },
	},
	exit: {
		x: "-100%",
		opacity: 0,
		transition: { duration: 3, ease: "linear" },
	},
};

const textFadeUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
			ease: "linear",
		},
	},
	exit: {
		opacity: 0,
		y: -30,
		transition: {
			duration: 1,
			ease: "linear",
		},
	},
};

export default function HeroBanner() {
	const [index, setIndex] = useState(0);
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		const interval = setInterval(
			() => setIndex((prev) => (prev + 1) % slides.length),
			8000
		);
		return () => clearInterval(interval);
	}, []);

	// Whenever slide index changes, hide text first.
	useEffect(() => {
		setShowText(false);
	}, [index]);

	const current = slides[index];

	return (
		<section className="relative w-full min-h-screen overflow-hidden bg-black">
			{/* Background slides */}
			<AnimatePresence initial={false}>
				<motion.div
					key={current.id}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					className="absolute inset-0"
					// When the slide finishes animating into "center",
					// we trigger the text to appear/animate.
					onAnimationComplete={() => {
						setShowText(true);
					}}>
					<Image
						src={current.image}
						alt="Interior Banner"
						fill
						className="object-cover"
						priority
					/>
				</motion.div>
			</AnimatePresence>

			{/* Content overlay */}
			<div className="relative z-20 flex min-h-screen items-center px-5 sm:px-10 md:px-20 lg:px-28">
				<AnimatePresence mode="wait">
					{showText && (
						<motion.div
							key={current.id}
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={textFadeUp}
							className="max-w-2xl text-white">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-xl">
								{current.title}
							</h1>

							<p className="mt-4 text-sm sm:text-base md:text-lg opacity-90 max-w-lg drop-shadow-md">
								{current.subtitle}
							</p>

							<Link href="/gallery">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="mt-6 px-7 py-3 bg-white text-black text-sm font-semibold rounded-full shadow-xl">
									See Our Latest Makeovers →
								</motion.button>
							</Link>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Right-side dots */}
			<div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
				{slides.map((s, i) => (
					<button
						key={s.id}
						onClick={() => setIndex(i)}
						className={`h-2.5 w-2.5 rounded-full transition ${
							i === index ? "bg-white" : "bg-white/40"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
