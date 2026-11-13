"use client";

import { useState, useEffect } from "react";
import IdeaSection from "./components/IdeaSection";
import JoinForm from "./components/JoinForm";
import { useReveal, useNavbarScroll } from "./hooks/useReveal";

export default function Home() {
  const ref = useReveal();
  useNavbarScroll();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <main ref={ref as React.RefObject<HTMLElement>} className="relative min-h-screen text-white bg-[#061220] font-serif">
      {/* Background image — fixed position */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/morning-sky-3.jpg')" }}
        aria-hidden="true"
      />

      {/* Deep gradient overlay — calibrated for sharp contrast */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-[#061220]/85 via-[#091b30]/72 to-[#0c223c]/85"
        aria-hidden="true"
      />

      {/* Animated film grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Floating particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="particle" style={{ top: "10%", left: "7%", animationDelay: "0s", animationDuration: "9s" }} />
        <div className="particle" style={{ top: "25%", left: "88%", animationDelay: "2s", animationDuration: "7s", width: "3px", height: "3px" }} />
        <div className="particle" style={{ top: "50%", left: "18%", animationDelay: "4s", animationDuration: "11s" }} />
        <div className="particle" style={{ top: "68%", left: "75%", animationDelay: "1s", animationDuration: "8s", width: "5px", height: "5px" }} />
        <div className="particle" style={{ top: "38%", left: "52%", animationDelay: "3s", animationDuration: "10s", width: "2px", height: "2px" }} />
        <div className="particle" style={{ top: "82%", left: "33%", animationDelay: "5s", animationDuration: "12s" }} />
        <div className="particle" style={{ top: "15%", left: "45%", animationDelay: "6s", animationDuration: "14s", width: "3px", height: "3px" }} />
        <div className="particle" style={{ top: "60%", left: "60%", animationDelay: "7s", animationDuration: "9s" }} />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10">
        {/* ─── Navbar: Full width, shifted to the far left, strictly no borders on scroll ─── */}
        <header
          id="main-navbar"
          className="fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-transparent border-none"
        >
          <nav className="w-full flex items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5">
            {/* Logo positioned at the far left edge in Instrument Serif */}
            <a
              href="#top"
              className="font-display text-2xl sm:text-3xl font-normal tracking-wide text-white hover:text-emerald-300 transition-colors duration-200"
            >
              Streamline<span className="text-emerald-400">.</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-9 text-base font-serif tracking-wide text-slate-200">
              <a href="#idea" className="link-underline transition-colors duration-200 hover:text-white">
                Manifesto
              </a>
              <a href="#join" className="link-underline transition-colors duration-200 hover:text-white">
                Waitlist
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className="hamburger-line"
                style={{ transform: mobileMenuOpen ? "translateY(4.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="hamburger-line"
                style={{ opacity: mobileMenuOpen ? 0 : 1, transform: mobileMenuOpen ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="hamburger-line"
                style={{ transform: mobileMenuOpen ? "translateY(-4.5px) rotate(-45deg)" : "none" }}
              />
            </button>
          </nav>

          {/* Mobile menu */}
          <div
            className={`md:hidden absolute inset-x-0 top-full transition-all duration-300 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
            style={{ background: "rgba(6, 18, 32, 0.98)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex flex-col items-center gap-6 py-10 text-xl font-serif text-slate-100">
              <a href="#idea" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-emerald-400">
                Manifesto
              </a>
              <a href="#join" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-emerald-400">
                Waitlist
              </a>
            </div>
          </div>
        </header>

        {/* ─── Hero Section ─── */}
        <section
          id="top"
          className="relative mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-6 pt-24 pb-12 text-center sm:px-8 sm:pt-28 sm:pb-16 md:px-10"
        >
          <div className="mx-auto max-w-4xl">
            <p className="reveal text-xs sm:text-sm uppercase tracking-[0.25em] text-emerald-400 font-medium mb-5 sm:mb-7 font-serif">
              Open Research Group — 2026
            </p>
            <h1 className="reveal font-display text-[clamp(3.2rem,8.5vw,6.8rem)] font-normal leading-[1.02] tracking-[-0.01em] text-white">
              Intelligence,{" "}
              <span className="font-instrument italic gradient-text">composed like</span>
              <br />
              second nature.
            </h1>

            <p className="reveal mx-auto mt-7 sm:mt-9 max-w-2xl text-lg sm:text-xl md:text-[1.25rem] text-slate-100 leading-[1.8] font-serif font-normal">
              We study the craft of post-training — turning open models into something purposeful, one clear step at a time.
            </p>
          </div>

          {/* Scroll cue (stationary) */}
          <div className="reveal mx-auto mt-14 sm:mt-20">
            <a
              href="#idea"
              className="inline-flex flex-col items-center gap-2 text-xs font-serif uppercase tracking-[0.25em] text-slate-300 transition-colors duration-200 hover:text-emerald-300"
              aria-label="Scroll to Manifesto"
            >
              <span>Read the manifesto</span>
              <span className="text-emerald-400 text-sm">↓</span>
            </a>
          </div>
        </section>

        {/* Animated divider */}
        <div className="mx-auto max-w-xs sm:max-w-md">
          <div className="divider-line mx-auto" />
        </div>

        {/* ─── Manifesto ─── */}
        <IdeaSection />

        {/* Animated divider */}
        <div className="mx-auto max-w-xs sm:max-w-md">
          <div className="divider-line mx-auto" />
        </div>

        {/* ─── Waitlist Section ─── */}
        <section id="join" className="px-6 py-20 text-center sm:px-8 sm:py-28 md:px-12 lg:py-36">
          <div className="reveal mx-auto max-w-xl sm:max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-emerald-400 font-medium mb-3 sm:mb-4 font-serif">
              Early Access
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal leading-[1.1] tracking-[-0.01em] text-white">
              Shape what comes next.
            </h2>
            <p className="mx-auto mt-5 sm:mt-6 max-w-sm sm:max-w-lg text-base sm:text-lg md:text-xl text-slate-200 leading-[1.8] font-serif font-normal">
              We are assembling a small group of researchers, students, and builders
              who want to rethink how models are adapted — from the ground up.
            </p>

            <div className="mt-8 sm:mt-10">
              <JoinForm />
            </div>
          </div>
        </section>
      </div>

      {/* ─── Footer ─── */}
      <footer className="relative z-20 border-t border-slate-200 bg-[#fafbfc] text-slate-700">
        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Brand column */}
            <div className="max-w-sm">
              <p className="font-display text-3xl font-normal tracking-wide text-[#0a0f0b]">
                Streamline<span className="text-emerald-600">.</span>
              </p>
              <p className="mt-2 text-sm font-serif text-slate-600 font-normal leading-relaxed">
                Open research group investigating composable post-training & model adaptation.
              </p>
            </div>

            {/* Researchers & Links column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-serif">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">
                  Undergraduate Researchers
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <span className="text-slate-900 font-medium">Ishit Jain</span> —{" "}
                    <a
                      href="https://x.com/ishjain13_fx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-700 underline underline-offset-2"
                    >
                      𝕏
                    </a>{" "}
                    ·{" "}
                  
                  </li>
                  <li>
                    <span className="text-slate-900 font-medium">Utkarsh</span> —{" "}
                      <a
                      href="https://heyutkarsh.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-700 underline underline-offset-2"
                    >
                      Portfolio ↗
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">
                  Index
                </p>
                <div className="flex flex-col gap-2 text-slate-600">
                  <a href="#top" className="link-underline hover:text-slate-900 transition-colors duration-200">
                    Top of Page ↑
                  </a>
                  <a href="#idea" className="link-underline hover:text-slate-900 transition-colors duration-200">
                    Manifesto
                  </a>
                  <a href="#join" className="link-underline hover:text-slate-900 transition-colors duration-200">
                    Join Waitlist
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 font-serif">
            © {new Date().getFullYear()} Streamline. Open research group for composable intelligence.
          </div>
        </div>
      </footer>
    </main>
  );
}
