"use client";

import { useReveal } from "../hooks/useReveal";

export default function IdeaSection() {
  const ref = useReveal();

  return (
    <section
      id="idea"
      ref={ref as React.RefObject<HTMLElement>}
      className="mx-auto max-w-4xl px-6 py-20 text-left sm:px-8 sm:py-24 md:px-10 lg:py-28 font-serif"
    >
      {/* Section label */}
      <p className="reveal-left text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-8 sm:mb-10 font-serif">
        Manifesto — 01
      </p>

      {/* 01. Who We Are */}
      <div className="reveal">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-white mb-5 sm:mb-6">
          Who we are
        </h2>
        <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-slate-100 leading-[1.85] font-normal max-w-3xl">
          <p>
            We are undergraduate computer science students who chose curiosity over convention.
          </p>
          <p>
            Our focus is post-training — the stage where a raw, open model is shaped into something that actually understands a specific purpose.
          </p>
          <p className="font-instrument italic text-emerald-300 text-xl sm:text-2xl leading-[1.6]">
            While most treat this as an afterthought, we treat it as the craft that matters most.
          </p>
        </div>

        {/* ─── Two Student Researchers Profiles ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 max-w-3xl">
          {/* Researcher 1  */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-2xl text-white font-normal">
                Ishit Jain
              </h3>
              <span className="text-[11px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                Researcher
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-serif">
              <a
                href="https://x.com/ishjain13_fx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-emerald-400/60 hover:bg-white/10 transition-colors duration-200"
              >
                <span>𝕏 Twitter ↗</span>
              </a>
            </div>
          </div>

          {/* Researcher 2 (Peer) */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-2xl text-white font-normal">
                Utkarsh
              </h3>
              <span className="text-[11px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                Researcher
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-serif">
               <a
                href="https://heyutkarsh.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-emerald-400/60 hover:bg-white/10 transition-colors duration-200"
              >
                <span>Portfolio ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Minimized clean divider gap */}
      <div className="divider-line my-10 sm:my-12 max-w-[140px]" />

      {/* 02. What We Believe In */}
      <div className="reveal">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-white mb-5 sm:mb-6">
          What we believe in
        </h2>
        <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-slate-100 leading-[1.85] font-normal max-w-3xl">
          <p>
            Customizing a model should be simple. Today, the process demands more machinery than insight — more configuration than creativity.
          </p>
          <p>
            We believe the steps between an idea and a working model can be fewer, clearer, and far more intuitive than the current landscape allows.
          </p>
          <p className="font-instrument italic text-emerald-300 text-xl sm:text-2xl leading-[1.6]">
            Intelligence should be composed, not wrestled into existence.
          </p>
        </div>
      </div>

      {/* Minimized clean divider gap */}
      <div className="divider-line my-10 sm:my-12 max-w-[140px]" />

      {/* 03. What We Do */}
      <div className="reveal">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-white mb-5 sm:mb-6">
          What we do
        </h2>
        <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-slate-100 leading-[1.85] font-normal max-w-3xl">
          <p>
            We start with open models and the methods people use to adapt them.
          </p>
          <p>
            We study those methods with rigor — testing, dissecting, and questioning every assumption — to find exactly where they can be made simpler, more reliable, or replaced entirely.
          </p>
          <p className="font-instrument italic text-emerald-300 text-xl sm:text-2xl leading-[1.6]">
            Our work is not about building products; it is about understanding the process deeply enough to make it effortless for everyone who follows.
          </p>
        </div>
      </div>
    </section>
  );
}
