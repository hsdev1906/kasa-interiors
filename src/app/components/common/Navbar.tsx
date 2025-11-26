"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/services", label: "Services" },
	{ href: "/gallery", label: "Gallery" },
	{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		function handleScroll() {
			setScrolled(window.scrollY > 10);
		}
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close menu on route change
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	const solidBackground = scrolled || menuOpen; // solid when scrolled OR mobile open

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50  h-16 md:h-24 transition-all duration-300 ${
				solidBackground
					? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
					: "bg-transparent border-b border-transparent backdrop-blur-none shadow-none"
			}`}>
			<motion.div
				initial={{ y: -24, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 120, damping: 18 }}
				className=" h-full flex max-w-7xl items-center justify-between">
				{/* Logo Section */}
				<Link
					href="/"
					className="relative flex items-center gap-3 group"
					aria-label="Kasa Interiors Home">
					<motion.div
						whileHover={{ scale: 1.04, rotate: -0.5 }}
						whileTap={{ scale: 0.98 }}
						className="relative flex h-16 w-32 items-center justify-start">
						<div className="absolute inset-0 rounded-3xl bg-[#447f80]/10 blur-xl group-hover:bg-[#447f80]/20 transition-all" />
						<div className="relative h-16 w-36 flex items-center justify-start">
							<Image
								src="https://res.cloudinary.com/djthwunnh/image/upload/v1764150280/logo-web-1_miqcdh.png"
								alt="Kasa Interiors Logo"
								fill
								className="object-contain"
							/>
						</div>
					</motion.div>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden items-center gap-6 lg:flex">
					<ul className="flex items-center gap-4 xl:gap-6">
						{navLinks.map((link, index) => {
							const isActive =
								link.href === "/"
									? pathname === "/"
									: pathname?.startsWith(link.href);

							return (
								<motion.li
									key={link.href}
									initial={{ opacity: 0, y: -6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.05 * index }}
									className="relative">
									<Link
										href={link.href}
										className={`group inline-flex flex-col items-center text-xs font-bold uppercase tracking-[0.22em] ${
											solidBackground ? "text-black" : "text-white"
										}`}>
										<span
											className={`transition-colors ${
												isActive
													? "" // keep base color from parent
													: solidBackground
													? "group-hover:text-[#447f80]"
													: "group-hover:text-slate-100"
											}`}>
											{link.label}
										</span>

										<motion.span
											layoutId="nav-underline"
											className={`mt-1 h-0.5 w-full rounded-full bg-[#447f80] origin-center ${
												isActive
													? "opacity-100 scale-x-100"
													: "opacity-0 scale-x-0 group-hover:opacity-90 group-hover:scale-x-100"
											}`}
											transition={{ duration: 0.25 }}
										/>
									</Link>
								</motion.li>
							);
						})}
					</ul>

					{/* CTA Button (stays teal on both backgrounds) */}
					<Link href="/contact" className="relative ml-4">
						<motion.button
							type="button"
							whileHover={{ scale: 1.04, y: -1 }}
							whileTap={{ scale: 0.97 }}
							className="group inline-flex items-center gap-2 rounded-full border border-[#447f80] bg-[#447f80] px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_30px_rgba(68,127,128,0.45)]">
							<span>Book Consultation</span>
							<motion.span
								initial={{ x: 0 }}
								whileHover={{ x: 2 }}
								className="text-[0.7rem]">
								↗
							</motion.span>
							<span className="pointer-events-none absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover:opacity-70 group-hover:border-white/60 transition" />
						</motion.button>
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 lg:hidden shadow-sm"
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Toggle navigation menu">
					<AnimatePresence mode="wait">
						{!menuOpen ? (
							<motion.span
								key="open"
								initial={{ opacity: 0, rotate: -10, y: 2 }}
								animate={{ opacity: 1, rotate: 0, y: 0 }}
								exit={{ opacity: 0, rotate: 10, y: -2 }}
								className="flex flex-col gap-[5px]">
								<span className="block h-0.5 w-4 rounded-full bg-[#447f80]" />
								<span className="block h-0.5 w-5 rounded-full bg-[#447f80]" />
								<span className="block h-0.5 w-3 rounded-full bg-[#447f80]" />
							</motion.span>
						) : (
							<motion.span
								key="close"
								initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
								animate={{ opacity: 1, scale: 1, rotate: 0 }}
								exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
								className="text-lg leading-none text-[#447f80]">
								✕
							</motion.span>
						)}
					</AnimatePresence>
				</button>
			</motion.div>

			{/* Mobile Menu Overlay (white background dropdown) */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25 }}
						className="lg:hidden">
						<div className="border-t border-slate-200 bg-white/98 backdrop-blur-xl">
							<nav className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
								<ul className="flex flex-col gap-2">
									{navLinks.map((link, idx) => {
										const isActive =
											link.href === "/"
												? pathname === "/"
												: pathname?.startsWith(link.href);

										return (
											<motion.li
												key={link.href}
												initial={{ opacity: 0, x: -16 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -16 }}
												transition={{ delay: idx * 0.04 }}>
												<Link
													href={link.href}
													className={`flex items-center justify-between rounded-xl border px-4 py-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase ${
														isActive
															? "border-[#447f80] bg-[#e6f0f0] text-[#447f80]"
															: "border-slate-200 bg-white text-slate-600 hover:border-[#447f80] hover:bg-[#f1f6f6] hover:text-[#447f80]"
													}`}>
													<span>{link.label}</span>
													<span className="text-[0.7rem] text-[#447f80]">
														{isActive ? "●" : "○"}
													</span>
												</Link>
											</motion.li>
										);
									})}
								</ul>

								{/* Mobile CTA */}
								<div className="mt-4">
									<Link href="/contact">
										<motion.div
											whileHover={{ scale: 1.02, y: -1 }}
											whileTap={{ scale: 0.98 }}
											className="flex items-center justify-center rounded-2xl border border-[#447f80] bg-[#447f80] px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(68,127,128,0.45)]">
											Book Consultation
										</motion.div>
									</Link>
								</div>
							</nav>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
