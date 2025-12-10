// "use client";

// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const slides = [
// 	{
// 		id: 0,
// 		title: `YOUR HOME. YOUR STORY. OUR DESIGN`,
// 		subtitle:
// 			"We design interiors that feel personal, warm, and unforgettable.",
// 		image:
// 			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151955/villa-HD_ywgpac.jpg",
// 	},
// 	{
// 		id: 1,
// 		title: `DESIGNS THAT FEEL LIKE YOU`,
// 		subtitle:
// 			"Modern, functional and timeless interiors built around your lifestyle.",
// 		image:
// 			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151915/pexels-dayvison-de-oliveira-silva-5733617-1920x1280_ckthe0.jpg",
// 	},
// 	{
// 		id: 2,
// 		title: `SPACES THAT INSPIRE EVERY DAY`,
// 		subtitle:
// 			"Elegant workspaces & commercial interiors that elevate your brand.",
// 		image:
// 			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151940/office_tidjvy.jpg",
// 	},
// ];

// const slideVariants: Variants = {
// 	enter: {
// 		x: "100%",
// 		opacity: 0,
// 	},
// 	center: {
// 		x: "0%",
// 		opacity: 1,
// 		transition: { duration: 2, ease: "easeOut" },
// 	},
// 	exit: {
// 		x: "-100%",
// 		opacity: 0,
// 		transition: { duration: 2, ease: "easeIn" },
// 	},
// };

// const textReveal: Variants = {
// 	hidden: {
// 		y: "50%",
// 		opacity: 0.2,
// 	},
// 	visible: {
// 		y: "0%",
// 		opacity: 1,
// 		transition: {
// 			duration: 1,
// 			ease: [0.22, 1, 0.36, 1],
// 		},
// 	},
// 	exit: {
// 		y: "50%",
// 		opacity: 0.5,
// 		transition: {
// 			duration: 0.5,
// 			ease: [0.4, 0, 1, 1],
// 		},
// 	},
// };

// export default function HeroBanner() {
// 	const [index, setIndex] = useState(0);
// 	const [showText, setShowText] = useState(false);

// 	useEffect(() => {
// 		const interval = setInterval(
// 			() => setIndex((prev) => (prev + 1) % slides.length),
// 			5900
// 		);
// 		return () => clearInterval(interval);
// 	}, []);

// 	// Whenever slide index changes, hide text first
// 	useEffect(() => {
// 		setShowText(false);
// 	}, [index]);

// 	const current = slides[index];

// 	return (
// 		<section className="relative w-full min-h-screen overflow-hidden">
// 			{/* Background slides */}
// 			<AnimatePresence mode="wait">
// 				<motion.div
// 					key={current.id}
// 					variants={slideVariants}
// 					initial="enter"
// 					animate="center"
// 					exit="exit"
// 					className="absolute inset-0"
// 					onAnimationComplete={(definition) => {
// 						// Only trigger once we've reached the center state
// 						if (definition === "center") {
// 							setShowText(true);
// 						}
// 					}}>
// 					<Image
// 						src={current.image}
// 						alt="Interior Banner"
// 						fill
// 						className="object-cover"
// 						priority
// 					/>
// 				</motion.div>
// 			</AnimatePresence>

// 			{/* Text content – gated by showText */}
// 			<div className="relative z-20 flex min-h-screen items-center px-5 sm:px-10 md:px-20 lg:px-28">
// 				<AnimatePresence mode="wait" initial={false}>
// 					{showText && (
// 						<motion.div
// 							key={current.id}
// 							variants={textReveal}
// 							initial="hidden"
// 							animate="visible"
// 							exit="exit"
// 							className=" relative max-w-2xl text-white p-4 rounded-2xl overflow-hidden">
// 							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-xl">
// 								{current.title}
// 							</h1>

// 							<p className="mt-4 text-sm sm:text-base md:text-lg opacity-90 max-w-lg drop-shadow-md">
// 								{current.subtitle}
// 							</p>

// 							<Link href="/gallery">
// 								<motion.button
// 									whileHover={{ scale: 1.05 }}
// 									whileTap={{ scale: 0.95 }}
// 									className="mt-6 px-7 py-3 bg-white text-black text-sm font-semibold rounded-full shadow-xl">
// 									See Our Latest Makeovers →
// 								</motion.button>
// 							</Link>
// 							<AnimatePresence mode="wait" initial={false}>
// 								{showText && (
// 									<motion.div
// 										key={index}
// 										initial={{ opacity: 0 }}
// 										animate={{ opacity: 0.55 }}
// 										exit={{ opacity: 0 }}
// 										transition={{ duration: 0.6, ease: "easeOut" }}
// 										className="absolute inset-0 z-10"
// 									/>
// 								)}
// 							</AnimatePresence>
// 						</motion.div>
// 					)}
// 				</AnimatePresence>
// 				{/* Dark overlay that appears with text */}
// 			</div>

// 			{/* Right-side dots */}
// 			<div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
// 				{slides.map((s, i) => (
// 					<button
// 						key={s.id}
// 						onClick={() => setIndex(i)}
// 						className={`h-2.5 w-2.5 rounded-full transition ${
// 							i === index ? "bg-white" : "bg-white/40"
// 						}`}
// 					/>
// 				))}
// 			</div>
// 		</section>
// 	);
// }
"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const slides = [
	{
		id: 0,
		title: `YOUR HOME. YOUR STORY. OUR DESIGN`,
		subtitle:
			"We design interiors that feel personal, warm, and unforgettable.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151955/villa-HD_ywgpac.jpg",
	},
	{
		id: 1,
		title: `DESIGNS THAT FEEL LIKE YOU`,
		subtitle:
			"Modern, functional and timeless interiors built around your lifestyle.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151915/pexels-dayvison-de-oliveira-silva-5733617-1920x1280_ckthe0.jpg",
	},
	{
		id: 2,
		title: `SPACES THAT INSPIRE EVERY DAY`,
		subtitle:
			"Elegant workspaces & commercial interiors that elevate your brand.",
		image:
			"https://res.cloudinary.com/djthwunnh/image/upload/v1764151940/office_tidjvy.jpg",
	},
];

const textReveal: Variants = {
	hidden: { y: "50%", opacity: 0.2 },
	visible: {
		y: "0%",
		opacity: 1,
		transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
	},
	exit: {
		y: "50%",
		opacity: 0.5,
		transition: { duration: 0.5, ease: [0.4, 0, 1, 1] },
	},
};

export default function HeroBanner() {
	const [index, setIndex] = useState(0);
	const [showText, setShowText] = useState(true);
	const sliderRef = useRef<Slider | null>(null);

	const current = slides[index];

	const settings = {
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 6500,
		speed: 2000,
		fade: true,
		arrows: false,
		pauseOnHover: false,
		beforeChange: (_: number, next: number) => setIndex(next),
	};

	// Control text animation timing after slide fade
	useEffect(() => {
		setShowText(false);
		const timeout = setTimeout(() => setShowText(true), 800);
		return () => clearTimeout(timeout);
	}, [index]);

	return (
		<section className="relative w-full min-h-screen overflow-hidden">
			{/* Background slider */}
			<div className="absolute inset-0 z-0">
				<Slider ref={sliderRef} {...settings} className="h-full">
					{slides.map((slide) => (
						<div key={slide.id}>
							<div className="relative h-screen w-full">
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									priority={slide.id === 0}
									sizes="100vw"
									className="object-cover"
								/>
							</div>
						</div>
					))}
				</Slider>
			</div>

			{/* Text content */}
			<div className="relative z-20 flex min-h-screen items-center px-5 sm:px-10 md:px-20 lg:px-28">
				<AnimatePresence mode="wait" initial={false}>
					{showText && (
						<motion.div
							key={current.id}
							variants={textReveal}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="relative max-w-2xl   sm:p-8 rounded-2xl overflow-hidden">
							<p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-100/90">
								Kasa Interiors
							</p>

							<h1 className="text-3xl font-bold leading-tight text-white drop-shadow-xl sm:text-4xl md:text-5xl">
								{current.title}
							</h1>

							<p className="mt-4 max-w-lg text-sm text-slate-100/90 drop-shadow-md sm:text-base md:text-lg">
								{current.subtitle}
							</p>

							<Link href="/gallery">
								<motion.button
									whileHover={{ scale: 1.05, translateY: -1 }}
									whileTap={{ scale: 0.96 }}
									className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-7 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-black/25">
									See Our Latest Makeovers
									<span className="text-lg">→</span>
								</motion.button>
							</Link>
							{/* Dark overlay for text */}
							<div className="pointer-events-none absolute inset-0 -z-10 bg-black/20 " />
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Right-side dots */}
			<div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 sm:right-6">
				{slides.map((s, i) => (
					<button
						key={s.id}
						onClick={() => sliderRef.current?.slickGoTo(i)}
						className={`h-2.5 w-2.5 rounded-full transition ${
							i === index ? "bg-white" : "bg-white/40"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
