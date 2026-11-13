"use client";

import IdeaSection from "./components/IdeaSection";
import JoinForm from "./components/JoinForm";
import { useReveal } from "./hooks/useReveal";

export default function Home() {
  const ref = useReveal();

  return (
    <main ref={ref as React.RefObject<HTMLElement>} className="relative min-h-screen text-slate-900 bg-[#f7f9f8] font-serif">
      {/* ─── Navbar: Logo on the far left edge, clean & simple ─── */}
      <header
        id="main-navbar"
        className="fixed inset-x-0 top-0 z-50 bg-transparent border-none"
      >
        <nav className="w-full flex items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5">
          <a
            href="#top"
            className="font-display text-2xl sm:text-3xl font-normal tracking-wide text-[#07192d] hover:text-[#047857] transition-colors duration-200"
          >
            Streamline<span className="text-[#047857]">.</span>
          </a>
        </nav>
      </header>

      {/* ─── Hero Section: hero-students.png at the start ─── */}
      <section
        id="top"
        className="relative flex min-h-[100dvh] w-full flex-col justify-center px-6 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20 md:px-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-students.png')" }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="particle" style={{ top: "10%", left: "7%", animationDelay: "0s", animationDuration: "9s" }} />
          <div className="particle" style={{ top: "25%", left: "88%", animationDelay: "2s", animationDuration: "7s", width: "3px", height: "3px" }} />
          <div className="particle" style={{ top: "50%", left: "18%", animationDelay: "4s", animationDuration: "11s" }} />
          <div className="particle" style={{ top: "68%", left: "75%", animationDelay: "1s", animationDuration: "8s", width: "5px", height: "5px" }} />
          <div className="particle" style={{ top: "38%", left: "52%", animationDelay: "3s", animationDuration: "10s", width: "2px", height: "2px" }} />
          <div className="particle" style={{ top: "82%", left: "33%", animationDelay: "5s", animationDuration: "12s" }} />
          <div className="particle" style={{ top: "15%", left: "45%", animationDelay: "6s", animationDuration: "14s", width: "3px", height: "3px" }} />
          <div className="particle" style={{ top: "60%", left: "60%", animationDelay: "7s", animationDuration: "9s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="reveal font-display text-[clamp(3.2rem,8.5vw,6.8rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#07192d]">
            Intelligence,{" "}
            <span className="font-instrument italic gradient-text">composed like</span>
            <br />
            second nature.
          </h1>

          <p className="reveal mx-auto mt-7 sm:mt-9 max-w-2xl text-lg sm:text-xl md:text-[1.25rem] text-[#1e293b] leading-[1.8] font-serif font-normal">
            We study the craft of post-training — turning open models into something purposeful, one clear step at a time.
          </p>
        </div>
      </section>

      {/* ─── Off-White Screen: Manifesto till Waitlist ─── */}
      <div className="relative z-10 bg-[#f7f9f8] text-slate-900 border-t border-slate-200/80">
        {/* Manifesto */}
        <IdeaSection />

        {/* Animated divider */}
        <div className="mx-auto max-w-xs sm:max-w-md">
          <div className="divider-line mx-auto" />
        </div>

        {/* ─── Waitlist Section ─── */}
        <section id="join" className="px-6 py-20 text-center sm:px-8 sm:py-28 md:px-12 lg:py-36">
          <div className="reveal mx-auto max-w-xl sm:max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#047857] font-semibold mb-3 sm:mb-4 font-serif">
              Early Access
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal leading-[1.1] tracking-[-0.01em] text-[#07192d]">
              Shape what comes next.
            </h2>
            <p className="mx-auto mt-5 sm:mt-6 max-w-sm sm:max-w-lg text-base sm:text-lg md:text-xl text-[#334155] leading-[1.8] font-serif font-normal">
              We are assembling a small group of researchers, students, and builders
              who want to rethink how models are adapted — from the ground up.
            </p>

            <div className="mt-8 sm:mt-10">
              <JoinForm />
            </div>
          </div>
        </section>
      </div>

      {/* ─── Footer: reduced sky height, background pinned to bottom, text shifted left & right ─── */}
      <footer
        className="relative z-20 flex min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] w-full flex-col justify-between bg-cover bg-[center_bottom] bg-no-repeat text-black border-t border-slate-200"
        style={{ backgroundImage: "url('/footer-students.png')" }}
      >
        <div className="relative z-10 flex w-full flex-1 flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between w-full">
            {/* Shifted to the Far Left: Brand text in Black */}
            <div className="max-w-md text-left">
              <p className="font-display text-3xl sm:text-4xl font-normal tracking-wide text-black">
                Streamline<span className="text-[#047857]">.</span>
              </p>
              <p className="mt-2 text-[15px] font-serif text-black font-medium leading-relaxed max-w-sm">
                Open research group investigating composable post-training &amp; model adaptation.
              </p>
            </div>

            {/* Shifted to the Far Right: Researchers text in Black */}
            <div className="text-sm font-serif text-left md:text-right">
              <p className="text-xs uppercase tracking-wider text-black font-bold mb-2.5">
                Undergraduate Researchers
              </p>
              <ul className="space-y-1.5 text-black font-medium">
                <li>
                  <span className="text-black font-semibold">Ishit Jain</span> —{" "}
                  <a
                    href="https://x.com/ishjain13_fx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#047857] underline underline-offset-2 transition-colors duration-200"
                  >
                    𝕏 Twitter ↗
                  </a>
                </li>
                <li>
                  <span className="text-black font-semibold">Utkarsh</span> —{" "}
                  <a
                    href="https://heyutkarsh.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#047857] underline underline-offset-2 transition-colors duration-200"
                  >
                    Portfolio ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Shifted to the very bottom: Copyright line in Black */}
          <div className="w-full text-center text-xs sm:text-sm text-black font-serif font-medium mt-auto pt-6 pb-2">
            © 2026 Streamline. Open research group for composable intelligence.
          </div>
        </div>
      </footer>
    </main>
  );
}
