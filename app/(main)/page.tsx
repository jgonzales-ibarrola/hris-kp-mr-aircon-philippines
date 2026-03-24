"use client";

import { useEffect, useRef } from "react";

type Product = {
	emoji: string;
	title: string;
	desc: string;
	tag: string;
	bg: string;
};

type Feature = {
	icon: string;
	title: string;
	desc: string;
	iconBg: string;
};

type Stat = {
	num: string;
	label: string;
};

const BRANDS: string[] = [
	"Mitsubishi Heavy",
	"LG",
	"Daikin",
	"Carrier",
	"Samsung",
	"Panasonic",
	"Koppel",
	"Hitachi",
];

const PRODUCTS: Product[] = [
	{
		emoji: "❄️",
		title: "Split-Type Inverter",
		desc: "Energy-efficient wall-mounted units ideal for bedrooms, living rooms, and small offices.",
		tag: "Residential",
		bg: "from-blue-50 to-sky-100",
	},
	{
		emoji: "🌀",
		title: "Multi-Split Systems",
		desc: "One outdoor unit powering multiple indoor units — perfect for homes and small commercial spaces.",
		tag: "Residential / Commercial",
		bg: "from-cyan-50 to-sky-100",
	},
	{
		emoji: "📦",
		title: "Ceiling Cassette",
		desc: "4-way and 2-way ceiling cassettes that deliver balanced airflow in open-plan spaces.",
		tag: "Commercial",
		bg: "from-blue-50 to-indigo-100",
	},
	{
		emoji: "🏗️",
		title: "Ceiling Concealed Duct",
		desc: "Hidden ducted systems for a seamless architectural finish in premium commercial builds.",
		tag: "Commercial",
		bg: "from-sky-50 to-blue-100",
	},
	{
		emoji: "📡",
		title: "Floor Mounted Inverter",
		desc: "Free-standing units designed for server rooms, showrooms, lobbies, and large open areas.",
		tag: "Commercial",
		bg: "from-cyan-50 to-teal-100",
	},
	{
		emoji: "🏭",
		title: "Industrial Precision",
		desc: "Large-scale precision air conditioning for data centers, hospitals, and industrial facilities.",
		tag: "Industrial",
		bg: "from-blue-50 to-blue-200",
	},
];

const FEATURES: Feature[] = [
	{
		icon: "🏆",
		title: "Authorized Dealer",
		desc: "Official dealer for 8 world-class brands. Every unit ships with full manufacturer warranty and genuine parts.",
		iconBg: "bg-blue-100 text-blue-700",
	},
	{
		icon: "⚡",
		title: "Expert Installation",
		desc: "Certified HVAC technicians handle site survey, installation, commissioning, and post-install testing.",
		iconBg: "bg-sky-100 text-sky-700",
	},
	{
		icon: "🌱",
		title: "Inverter Technology",
		desc: "We specialize in energy-efficient inverter systems that reduce electricity bills by up to 60%.",
		iconBg: "bg-cyan-100 text-cyan-700",
	},
	{
		icon: "📞",
		title: "Nationwide Coverage",
		desc: "Serving Metro Manila and provinces — residential, commercial, and industrial clients across the Philippines.",
		iconBg: "bg-blue-100 text-blue-700",
	},
];

const STATS: Stat[] = [
	{ num: "8+", label: "Authorized Brands" },
	{ num: "100%", label: "Genuine Units" },
	{ num: "24/7", label: "After-Sales Support" },
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function scrollToSection(id: string): void {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────
   HOOK — scroll reveal
───────────────────────────────────────── */
function useScrollReveal(): void {
	useEffect(() => {
		const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						const delay = el.dataset.delay ?? "0";
						setTimeout(() => {
							el.style.opacity = "1";
							el.style.transform = "translateY(0)";
						}, Number(delay));
						io.unobserve(el);
					}
				});
			},
			{ threshold: 0.12 },
		);
		els.forEach((el) => {
			el.style.opacity = "0";
			el.style.transform = "translateY(28px)";
			el.style.transition =
				"opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
			io.observe(el);
		});
		return () => io.disconnect();
	}, []);
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Page() {
	const tickerRef = useRef<HTMLDivElement>(null);
	useScrollReveal();

	return (
		<div className="bg-white text-slate-900 overflow-x-hidden font-sans">
			{/* ══════════════ HERO ══════════════ */}
			<section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
				{/* Backgrounds */}
				<div className="absolute inset-0 bg-linear-to-br from-blue-950 via-blue-900 to-blue-800" />
				<div
					className="absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage:
							"repeating-linear-gradient(-55deg, white, white 1px, transparent 1px, transparent 60px)",
					}}
				/>

				{/* Bottom wave */}
				<div className="absolute bottom-0 inset-x-0 leading-none">
					<svg
						viewBox="0 0 1440 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full"
					>
						<path
							d="M0 120V60C360 0 720 120 1080 60C1260 30 1380 60 1440 80V120H0Z"
							fill="white"
						/>
					</svg>
				</div>

				{/* Glow orbs */}
				<div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20">
					<div className="max-w-2xl">
						{/* Badge */}
						<div
							className="inline-flex items-center gap-2 bg-blue-800/60 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
							style={{
								animation:
									"fadeUp 0.6s 0.1s both cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							<span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
							Authorized Dealer · Philippines
						</div>

						{/* Heading */}
						<h1
							className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
							style={{
								animation:
									"fadeUp 0.7s 0.2s both cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							The Only Place
							<br />
							For{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-cyan-300">
								All Aircons
							</span>
						</h1>

						<p
							className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg"
							style={{
								animation:
									"fadeUp 0.7s 0.3s both cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							From compact residential units to large-scale
							industrial cooling systems — Mr. Aircon is your
							trusted partner for supply, installation, and
							service.
						</p>

						{/* CTAs */}
						<div
							className="flex flex-wrap gap-3"
							style={{
								animation:
									"fadeUp 0.7s 0.4s both cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							<button
								onClick={() => scrollToSection("products")}
								className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-900 font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-xl shadow-black/20"
							>
								Browse Products
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									strokeWidth={2.5}
									viewBox="0 0 24 24"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</button>
							<a
								href="https://www.facebook.com/MrAirconPhilippines"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all backdrop-blur-sm"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								Follow on Facebook
							</a>
						</div>

						{/* Stats */}
						<div
							className="mt-14 flex flex-wrap gap-8"
							style={{
								animation:
									"fadeUp 0.7s 0.5s both cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							{STATS.map((s) => (
								<div key={s.label}>
									<div className="text-3xl font-black text-white">
										{s.num}
									</div>
									<div className="text-xs text-blue-300 mt-0.5 font-medium">
										{s.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ══════════════ BRAND TICKER ══════════════ */}
			<div className="bg-blue-950 border-y border-blue-800 py-4 overflow-hidden">
				<div className="flex items-center">
					<div className="shrink-0 px-6 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border-r border-blue-700 mr-4 whitespace-nowrap">
						Authorized Brands
					</div>
					<div className="overflow-hidden flex-1">
						<div
							ref={tickerRef}
							className="flex gap-10 items-center whitespace-nowrap"
							style={{ animation: "ticker 20s linear infinite" }}
						>
							{[...BRANDS, ...BRANDS].map((b, i) => (
								<span
									key={i}
									className="text-blue-300 font-bold text-sm tracking-wide hover:text-white transition-colors cursor-default"
								>
									{b}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* ══════════════ PRODUCTS ══════════════ */}
			<section id="products" className="py-24 px-5 sm:px-8 bg-slate-50">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
						<div data-reveal data-delay="0">
							<p className="text-sky-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">
								Our Product Range
							</p>
							<h2 className="text-4xl sm:text-5xl font-black text-blue-950 tracking-tight leading-tight">
								Every Type of Aircon,
								<br />
								<span className="text-blue-600">
									One Place.
								</span>
							</h2>
						</div>
						<p
							data-reveal
							data-delay="100"
							className="text-slate-500 text-sm leading-relaxed max-w-sm md:text-right"
						>
							Whether you need a simple bedroom unit or a full
							building cooling system, we have the right solution
							for you.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{PRODUCTS.map((p, i) => (
							<div
								key={p.title}
								data-reveal
								data-delay={String(i * 80)}
								className="group bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
							>
								<div
									className={`h-40 bg-linear-to-br ${p.bg} flex items-center justify-center text-5xl relative overflow-hidden`}
								>
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-blue-600/10 to-sky-400/10" />
									{p.emoji}
								</div>
								<div className="p-6">
									<h3 className="font-black text-blue-950 text-lg mb-2 tracking-tight">
										{p.title}
									</h3>
									<p className="text-slate-500 text-sm leading-relaxed">
										{p.desc}
									</p>
									<span className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
										{p.tag}
									</span>
								</div>
							</div>
						))}
					</div>

					<div data-reveal className="mt-12 text-center">
						<a
							href="https://www.mraircon.ph"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all"
						>
							See Full Product Catalog
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</section>

			{/* ══════════════ WHY US ══════════════ */}
			<section id="why" className="py-24 px-5 sm:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* Left */}
						<div>
							<p
								data-reveal
								className="text-sky-600 text-xs font-bold uppercase tracking-[0.18em] mb-2"
							>
								Why Mr. Aircon
							</p>
							<h2
								data-reveal
								className="text-4xl sm:text-5xl font-black text-blue-950 tracking-tight leading-tight mb-4"
							>
								Your Comfort is
								<br />
								Our Business
							</h2>
							<p
								data-reveal
								className="text-slate-500 text-sm leading-relaxed mb-10 max-w-md"
							>
								We don&apos;t just sell aircons. We deliver
								complete cooling solutions backed by expert
								installation, genuine units, and after-sales
								support you can count on.
							</p>

							<div className="space-y-4">
								{FEATURES.map((f, i) => (
									<div
										key={f.title}
										data-reveal
										data-delay={String(i * 80)}
										className="flex gap-4 items-start p-5 rounded-2xl hover:bg-slate-50 transition-colors cursor-default group"
									>
										<div
											className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${f.iconBg} transition-transform group-hover:scale-110`}
										>
											{f.icon}
										</div>
										<div>
											<h4 className="font-bold text-blue-950 mb-1">
												{f.title}
											</h4>
											<p className="text-slate-500 text-sm leading-relaxed">
												{f.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right */}
						<div data-reveal className="relative">
							<div className="bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 rounded-3xl p-10 overflow-hidden shadow-2xl shadow-blue-900/40">
								<div
									className="absolute inset-0 opacity-[0.05]"
									style={{
										backgroundImage:
											"radial-gradient(circle, white 1px, transparent 1px)",
										backgroundSize: "24px 24px",
									}}
								/>
								<div className="absolute -top-4 -right-4 text-[10rem] font-black text-white/5 leading-none select-none pointer-events-none">
									8
								</div>

								<div className="relative z-10">
									<div className="inline-flex items-center gap-2 bg-sky-400/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
										<span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
										Authorized Dealer
									</div>

									<h3 className="text-white font-black text-3xl sm:text-4xl leading-tight mb-10 tracking-tight">
										Genuine Units.
										<br />
										<span className="text-sky-400">
											Certified Service.
										</span>
									</h3>

									<div className="grid grid-cols-3 gap-4 mb-10">
										{STATS.map((s) => (
											<div
												key={s.label}
												className="bg-blue-800/50 rounded-2xl p-4 text-center"
											>
												<div className="text-2xl sm:text-3xl font-black text-white">
													{s.num}
												</div>
												<div className="text-blue-300 text-[10px] mt-1 font-medium leading-tight">
													{s.label}
												</div>
											</div>
										))}
									</div>

									<div>
										<p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-3">
											Authorized Brands
										</p>
										<div className="flex flex-wrap gap-2">
											{BRANDS.map((b) => (
												<span
													key={b}
													className="text-[10px] font-bold text-blue-200 bg-blue-800/60 border border-blue-700 px-3 py-1 rounded-full"
												>
													{b}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Floating badge */}
							<div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl shadow-blue-900/15 p-4 flex items-center gap-3 border border-blue-100">
								<div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">
									✅
								</div>
								<div>
									<div className="text-xs font-black text-blue-950">
										100% Genuine
									</div>
									<div className="text-[10px] text-slate-400">
										All units are brand-authorized
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ══════════════ BRANDS GRID ══════════════ */}
			<section className="py-20 px-5 sm:px-8 bg-blue-50">
				<div className="max-w-7xl mx-auto">
					<div data-reveal className="text-center mb-12">
						<p className="text-sky-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">
							Our Partners
						</p>
						<h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
							Top Brands, All in One Place
						</h2>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						{BRANDS.map((b, i) => (
							<div
								key={b}
								data-reveal
								data-delay={String(i * 60)}
								className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-blue-300 hover:shadow-md transition-all group"
							>
								<div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-black text-sm group-hover:bg-blue-800 transition-colors">
									{b.slice(0, 2).toUpperCase()}
								</div>
								<span className="text-blue-900 font-bold text-xs text-center uppercase tracking-wide">
									{b}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ══════════════ CTA ══════════════ */}
			<section
				id="contact"
				className="relative py-28 px-5 sm:px-8 overflow-hidden"
			>
				<div className="absolute inset-0 bg-linear-to-br from-blue-950 via-blue-900 to-blue-800" />
				<div
					className="absolute inset-0 opacity-[0.07]"
					style={{
						backgroundImage:
							"repeating-linear-gradient(-55deg, white, white 1px, transparent 1px, transparent 50px)",
					}}
				/>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-2xl mx-auto text-center">
					<p
						data-reveal
						className="text-sky-400 text-xs font-bold uppercase tracking-[0.18em] mb-3"
					>
						Get In Touch
					</p>
					<h2
						data-reveal
						className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5"
					>
						Ready to Stay Cool?
					</h2>
					<p
						data-reveal
						className="text-blue-300 text-base leading-relaxed mb-10"
					>
						Talk to our aircon specialists today. We&apos;ll help
						you pick the right unit, get the best price, and have it
						installed fast.
					</p>

					<div
						data-reveal
						className="flex flex-wrap justify-center gap-3"
					>
						<a
							href="https://www.mraircon.ph"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-900 font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-xl shadow-black/20"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<circle cx="12" cy="12" r="10" />
								<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
							</svg>
							Visit mraircon.ph
						</a>
						<a
							href="https://www.facebook.com/MrAirconPhilippines"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all"
						>
							<svg
								className="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
							Message on Facebook
						</a>
					</div>
				</div>
			</section>

			{/* ══════════════ FOOTER ══════════════ */}
			<footer className="bg-[#020b1a] text-blue-400 py-10 px-5 sm:px-8">
				<div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<div>
						<span className="text-white font-black text-lg tracking-tight">
							Mr.<span className="text-sky-400">Aircon</span>{" "}
							Philippines
						</span>
						<p className="text-blue-500 text-xs mt-1">
							The Only Place For All Aircons
						</p>
					</div>

					<nav className="flex flex-wrap justify-center gap-5 text-xs font-medium">
						<button
							onClick={() => scrollToSection("products")}
							className="hover:text-white transition-colors"
						>
							Products
						</button>
						<button
							onClick={() => scrollToSection("why")}
							className="hover:text-white transition-colors"
						>
							Why Us
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="hover:text-white transition-colors"
						>
							Contact
						</button>
						<a
							href="https://www.mraircon.ph"
							target="_blank"
							rel="noreferrer"
							className="hover:text-white transition-colors"
						>
							Website
						</a>
					</nav>

					<p className="text-blue-600 text-xs">
						© {new Date().getFullYear()} Mr. Aircon Philippines
					</p>
				</div>
			</footer>

			{/* ══════════════ KEYFRAMES ══════════════ */}
			<style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
		</div>
	);
}
