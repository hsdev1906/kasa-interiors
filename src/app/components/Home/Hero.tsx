"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ACCENT = "#447f80";

const HOMES_URL =
	"https://res.cloudinary.com/djthwunnh/image/upload/v1764151955/villa-HD_ywgpac.jpg";
const APARTMENTS_URL =
	"https://res.cloudinary.com/djthwunnh/image/upload/v1764151915/pexels-dayvison-de-oliveira-silva-5733617-1920x1280_ckthe0.jpg";
const COMMERCIAL_URL =
	"https://res.cloudinary.com/djthwunnh/image/upload/v1764151940/office_tidjvy.jpg";

const slides = [
	{
		id: 0,
		tag: "Homes & Villas",
		title: "Crafting spaces that inspire & endure.",
		subtitle: "Premium interiors for homes, villas & private residences.",
		mainImage: HOMES_URL,
		card1: { label: "Apartments", image: APARTMENTS_URL },
		card2: { label: "Commercial & Offices", image: COMMERCIAL_URL },
	},
	{
		id: 1,
		tag: "Apartments",
		title: "Thoughtful design for modern city living.",
		subtitle: "Space-smart interiors for 2BHK, 3BHK & duplex apartments.",
		mainImage: APARTMENTS_URL,
		card1: { label: "Homes & Villas", image: HOMES_URL },
		card2: { label: "Commercial & Offices", image: COMMERCIAL_URL },
	},
	{
		id: 2,
		tag: "Commercial & Offices",
		title: "Workspaces that look sharp & perform well.",
		subtitle: "Clean, focused environments for teams, clients & brands.",
		mainImage: COMMERCIAL_URL,
		card1: { label: "Homes & Villas", image: HOMES_URL },
		card2: { label: "Apartments", image: APARTMENTS_URL },
	},
];

const slideVariants: Variants = {
	enter: (direction: number) => ({
		opacity: 0,
		x: direction > 0 ? 60 : -60,
		scale: 0.98,
	}),
	center: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: { duration: 0.7, ease: "easeOut" },
	},
	exit: (direction: number) => ({
		opacity: 0,
		x: direction > 0 ? -60 : 60,
		scale: 0.98,
		transition: { duration: 0.45, ease: "easeIn" },
	}),
};

export default function HeroCarousel() {
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	const current = slides[index];

	useEffect(() => {
		const interval = setInterval(() => {
			setDirection(1);
			setIndex((prev) => (prev + 1) % slides.length);
		}, 7000);
		return () => clearInterval(interval);
	}, []);

	const goTo = (nextIndex: number) => {
		if (nextIndex === index) return;
		setDirection(nextIndex > index ? 1 : -1);
		setIndex((nextIndex + slides.length) % slides.length);
	};

	const goNext = () => goTo(index + 1);
	const goPrev = () => goTo(index - 1);

	return (
		<section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black text-white">
			{/* Glassy border around whole hero for a premium feel */}
			<div className="pointer-events-none absolute inset-0 border-b border-white/10" />

			<AnimatePresence custom={direction} mode="wait">
				<motion.div
					key={current.id}
					custom={direction}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					className="absolute inset-0  pt-16 md:pt-24">
					{/* Background image */}
					<div className="absolute inset-0">
						<Image
							src={current.mainImage}
							alt={current.tag}
							fill
							priority
							className="object-cover"
						/>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />
						{/* Accent vignette */}
						<div className="pointer-events-none absolute inset-y-10 left-10 right-1/3 translate-y-4 rounded-[3rem] border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#447f80]/10" />
					</div>

					{/* Content */}
					<div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
						{/* Left: Text */}
						<div className="max-w-xl space-y-6">
							<div className="inline-flex items-center gap-3 rounded-full bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-100/85 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
								<span className="h-1.5 w-1.5 rounded-full bg-[#d1f3f2]" />
								<span>Kasa Interiors · {current.tag}</span>
							</div>

							<h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem]">
								<span className="font-serif leading-tight">
									{current.title.split(" ").slice(0, 2).join(" ")}
								</span>{" "}
								<span className="font-serif italic text-[#e8f7f6]">
									{current.title.split(" ").slice(2).join(" ")}
								</span>
							</h1>

							<p className="max-w-md text-sm text-slate-100/85 sm:text-base">
								{current.subtitle}
							</p>

							<div className="flex flex-wrap items-center gap-4 pt-1">
								<Link href="/contact">
									<motion.button
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.97 }}
										className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-slate-900 shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
										<span>Start Your Project</span>
										<motion.span
											initial={{ x: 0 }}
											whileHover={{ x: 3 }}
											className="text-[0.85rem]"
											style={{ color: ACCENT }}>
											↗
										</motion.span>
									</motion.button>
								</Link>

								<Link href="/gallery">
									<motion.button
										whileHover={{ scale: 1.03, y: -1 }}
										whileTap={{ scale: 0.97 }}
										className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-black/20 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-50 hover:border-[#d1f3f2] hover:bg-white/10 transition">
										View Portfolio
									</motion.button>
								</Link>
							</div>

							{/* small subline */}
							<div className="flex items-center gap-3 pt-3 text-[0.7rem] text-slate-200/80">
								<div className="h-px w-10 bg-linear-to-r from-transparent via-white/50 to-transparent" />
								<p>Homes · Apartments · Commercial Interiors across AP & TS</p>
							</div>
						</div>

						{/* Right: Floating cards (md+) */}
						<div className="relative hidden h-full flex-1 items-center justify-center md:flex">
							{/* Top card */}
							<motion.div
								initial={{ opacity: 0, y: -10, x: 40 }}
								animate={{
									opacity: 1,
									x: 26,
									y: [-40, -52, -40],
								}}
								transition={{
									duration: 2.5,
									ease: "easeInOut",
									repeatType: "mirror",
									delay: 0.2,
								}}
								whileHover={{
									scale: 1.03,
									boxShadow: "0 24px 70px rgba(0,0,0,0.7)",
									borderColor: ACCENT,
								}}
								className="relative h-52 w-80 overflow-hidden rounded-[26px] border border-white/40 bg-black/40 shadow-[0_18px_55px_rgba(0,0,0,0.65)] backdrop-blur-md">
								<Image
									src={current.card1.image}
									alt={current.card1.label}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
								<div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[0.7rem] font-medium">
									<span className="h-1.5 w-1.5 rounded-full bg-[#d1f3f2]" />
									<span>{current.card1.label}</span>
								</div>
							</motion.div>

							{/* Bottom card */}
							<motion.div
								initial={{ opacity: 0, y: 20, x: -10 }}
								animate={{
									opacity: 1,
									x: -16,
									y: [40, 28, 40],
								}}
								transition={{
									duration: 2.5,
									ease: "easeInOut",
									repeatType: "mirror",
									delay: 0.5,
								}}
								whileHover={{
									scale: 1.03,
									boxShadow: "0 24px 70px rgba(0,0,0,0.8)",
									borderColor: ACCENT,
								}}
								className="relative h-48 w-72 overflow-hidden rounded-3xl border border-white/35 bg-black/45 shadow-[0_18px_55px_rgba(0,0,0,0.75)] backdrop-blur-md">
								<Image
									src={current.card2.image}
									alt={current.card2.label}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
								<div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[0.7rem] font-medium">
									<span className="h-1.5 w-1.5 rounded-full bg-[#d1f3f2]" />
									<span>{current.card2.label}</span>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Controls & dots */}
			<div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-center justify-between px-4 md:px-6 lg:px-8">
				{/* Arrows */}
				<div className="pointer-events-auto flex gap-2">
					<button
						onClick={goPrev}
						className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/40 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#447f80] hover:border-[#447f80] transition">
						‹
					</button>
					<button
						onClick={goNext}
						className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/40 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#447f80] hover:border-[#447f80] transition">
						›
					</button>
				</div>

				{/* Dots + accent progress feel */}
				<div className="pointer-events-auto flex items-center gap-3">
					<div className="flex items-center gap-2">
						{slides.map((s, i) => (
							<button
								key={s.id}
								onClick={() => goTo(i)}
								className={`h-2 rounded-full transition ${
									i === index
										? "w-6 bg-[#447f80]"
										: "w-2 bg-white/50 hover:bg-white/80"
								}`}
								aria-label={`Go to slide ${i + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
