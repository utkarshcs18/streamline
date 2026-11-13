"use client";

import { useState, useEffect, useRef } from "react";

// ─── Node Details Data for Context Callouts ───
const NODE_DETAILS: Record<string, { title: string; tag: string; description: string }> = {
  // Panel 01
  q1: {
    title: "How an open model becomes useful",
    tag: "Architecture & Lineage",
    description: "Raw weights contain vast latent capability, but lack task-specific calibration. We investigate how selective adaptation can impart deep specialization without catastrophic forgetting."
  },
  q2: {
    title: "How adaptation methods actually work",
    tag: "Mechanistic Dissection",
    description: "Examining parameter-efficient fine-tuning regimes (LoRA, rank-stabilized adapters, and activation steering) at the weight-delta level to see what is necessary versus redundant."
  },
  q3: {
    title: "Where steps can be fewer & simpler",
    tag: "Workflow Synthesis",
    description: "Pruning away brittle hyperparameter grids and opaque configurations in favor of lean, deterministic post-training pipelines that anyone can execute and inspect."
  },
  target: {
    title: "Streamline Research Group",
    tag: "Open Collective",
    description: "An undergraduate-led research collective dedicated to making open model post-training transparent, composable, and accessible to independent builders."
  },
  // Panel 02
  b1: {
    title: "A model almost fits",
    tag: "Stage 01: Observation",
    description: "Generalist open models get you 80% of the way there, but the last 20% determines whether the system feels like a fragile gimmick or a rock-solid tool."
  },
  b2: {
    title: "Adapting takes machinery",
    tag: "Stage 02: The Problem",
    description: "Current fine-tuning workflows require sprawling cluster scripts, complex tokenizer adjustments, and trial-and-error configurations that distract from research insight."
  },
  b3: {
    title: "Make it feel simple",
    tag: "Stage 03: The Vision",
    description: "We are establishing the benchmark that adapting an open model should be as fluid, intuitive, and composable as writing a single function in code."
  },
  // Panel 03
  d_open: {
    title: "Open Models",
    tag: "Input 01: Foundation Weights",
    description: "Building exclusively on open-weights ecosystems (Llama, Mistral, Gemma) to guarantee full auditability, reproducibility, and community ownership."
  },
  d_methods: {
    title: "Today's Methods",
    tag: "Input 02: Current State of the Art",
    description: "Auditing existing parameter-efficient techniques, direct preference optimization, and supervised fine-tuning regimes under rigorous empirical conditions."
  },
  d_aims: {
    title: "Our 3 Core Aims",
    tag: "Research Methodology",
    description: "1. Understand today's methods mathematically. 2. Empirically benchmark them in isolation. 3. Synthesize cleaner, simpler adaptations with fewer moving parts."
  },
  d_proj: {
    title: "First Project: Cold-Email Model",
    tag: "Milestone Demo",
    description: "Our initial public research artifact — a compact, purpose-built open model calibrated for natural conversational outreach, tone nuance, and zero hallucination."
  }
};

export default function IdeaSection() {
  const [activeNode1, setActiveNode1] = useState<string | null>(null);
  const [activeNode2, setActiveNode2] = useState<string | null>(null);
  const [activeNode3, setActiveNode3] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll tracking for central spine fill
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight * 0.4;
      const currentDist = -rect.top + windowHeight * 0.3;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="idea"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-20 text-left sm:px-8 sm:py-24 md:px-10 lg:py-28 font-serif"
    >
      {/* ─── Spine (Desktop central connector line) ─── */}
      <div className="hidden lg:block absolute left-1/2 top-32 bottom-32 -translate-x-1/2 w-[2px] bg-slate-200/90 pointer-events-none" aria-hidden="true">
        <div
          className="w-full bg-[#047857] transition-all duration-300 ease-out origin-top shadow-[0_0_8px_rgba(4,120,87,0.4)]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PANEL 01: Who We Are
          ───────────────────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-28 sm:mb-36">
        {/* Left Column: Prose & Profiles */}
        <div className="lg:col-span-6 reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-[#047857] font-semibold mb-6 font-serif">
            Manifesto — 01
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-[#07192d] mb-5 sm:mb-6">
            Who we are
          </h2>
          <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-[#1e293b] leading-[1.85] font-normal">
            <p>
              We are undergraduate computer science students who chose curiosity over convention.
            </p>
            <p>
              Our focus is post-training — the stage where a raw, open model is shaped into something that actually understands a specific purpose.
            </p>
            <p className="font-instrument italic text-[#047857] text-xl sm:text-2xl leading-[1.6]">
              While most treat this as an afterthought, we treat it as the craft that matters most.
            </p>
          </div>

          {/* ─── Two Student Researchers Profiles ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200">
            {/* Researcher 1 — Ishit Jain */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-2xl text-[#07192d] font-normal">
                  Ishit Jain
                </h3>
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#047857] font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  Researcher
                </span>
              </div>
              <p className="text-sm font-serif text-slate-600 mb-4 leading-relaxed">
                Undergraduate CS — focus on post-training dynamics, composable lineage & model adaptation.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-serif">
                <a
                  href="https://x.com/ishjain13_fx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#047857] hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors duration-200"
                >
                  <span>𝕏 Twitter ↗</span>
                </a>
              </div>
            </div>

            {/* Researcher 2 — Utkarsh */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-2xl text-[#07192d] font-normal">
                  Utkarsh
                </h3>
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#047857] font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  Researcher
                </span>
              </div>
              <p className="text-sm font-serif text-slate-600 mb-4 leading-relaxed">
                Undergraduate CS — focus on open model architectures, adaptation topologies & evaluation.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-serif">
                <a
                  href="https://heyutkarsh.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#047857] hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors duration-200"
                >
                  <span>Portfolio ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Flowchart 01 */}
        <div className="lg:col-span-6 reveal flex flex-col items-center">
          {/* Interactive Filter Pills */}
          <div className="w-full max-w-[370px] mb-4 flex flex-wrap items-center justify-between gap-1.5 text-xs font-serif">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Interactive Flow:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: null, label: "All" },
                { id: "q1", label: "Q1" },
                { id: "q2", label: "Q2" },
                { id: "q3", label: "Q3" },
                { id: "target", label: "Streamline" }
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setActiveNode1(btn.id)}
                  className={`px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    activeNode1 === btn.id
                      ? "bg-[#047857] text-white border-[#047857] shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-[#047857]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[370px] relative">
            <svg
              viewBox="0 0 340 530"
              className="w-full h-auto overflow-visible select-none"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.03))" }}
            >
              <defs>
                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#047857" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Dotted paths connecting Question Cards to Target */}
              {/* Path 1: Q1 -> Target */}
              <path
                d="M310 56 H324 V370 C324 400, 170 380, 170 410"
                fill="none"
                stroke={activeNode1 === "q1" || hoveredNode === "q1" || activeNode1 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode1 === "q1" || hoveredNode === "q1" ? "2.5" : "1.5"}
                strokeDasharray="4 5"
                className={`transition-colors duration-300 ${
                  activeNode1 === "q1" || hoveredNode === "q1" ? "flow-dash-anim" : ""
                }`}
              />

              {/* Path 2: Q2 -> Target */}
              <path
                d="M310 148 H324"
                fill="none"
                stroke={activeNode1 === "q2" || hoveredNode === "q2" || activeNode1 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode1 === "q2" || hoveredNode === "q2" ? "2.5" : "1.5"}
                strokeDasharray="4 5"
                className={`transition-colors duration-300 ${
                  activeNode1 === "q2" || hoveredNode === "q2" ? "flow-dash-anim" : ""
                }`}
              />

              {/* Path 3: Q3 -> Target */}
              <path
                d="M310 240 H324"
                fill="none"
                stroke={activeNode1 === "q3" || hoveredNode === "q3" || activeNode1 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode1 === "q3" || hoveredNode === "q3" ? "2.5" : "1.5"}
                strokeDasharray="4 5"
                className={`transition-colors duration-300 ${
                  activeNode1 === "q3" || hoveredNode === "q3" ? "flow-dash-anim" : ""
                }`}
              />

              {/* Branch line from spine to Streamline card */}
              <line
                x1="0"
                y1="450"
                x2="20"
                y2="450"
                stroke="#047857"
                strokeWidth="2"
              />
              <circle cx="0" cy="450" r="4.5" fill="#047857" />
              <circle cx="20" cy="450" r="3.5" fill="#047857" />

              {/* ─── Question Card 1 ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("q1")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode1(activeNode1 === "q1" ? null : "q1")}
              >
                <rect
                  x="20"
                  y="20"
                  width="290"
                  height="72"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode1 === "q1" || hoveredNode === "q1" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode1 === "q1" || hoveredNode === "q1" ? "2" : "1.5"}
                  filter={activeNode1 === "q1" || hoveredNode === "q1" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="38"
                  cy="46"
                  r={activeNode1 === "q1" ? "4.5" : "3.5"}
                  fill="#047857"
                  className={activeNode1 === "q1" ? "node-pulse-anim" : ""}
                />
                <text x="50" y="47" className="font-serif text-[13.5px] font-medium" fill="#07192d">
                  How does an open model become
                </text>
                <text x="50" y="67" className="font-serif text-[13px]" fill="#64748b">
                  useful for a specific purpose?
                </text>
              </g>

              {/* ─── Question Card 2 ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("q2")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode1(activeNode1 === "q2" ? null : "q2")}
              >
                <rect
                  x="20"
                  y="112"
                  width="290"
                  height="72"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode1 === "q2" || hoveredNode === "q2" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode1 === "q2" || hoveredNode === "q2" ? "2" : "1.5"}
                  filter={activeNode1 === "q2" || hoveredNode === "q2" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="38"
                  cy="138"
                  r={activeNode1 === "q2" ? "4.5" : "3.5"}
                  fill="#047857"
                  className={activeNode1 === "q2" ? "node-pulse-anim" : ""}
                />
                <text x="50" y="139" className="font-serif text-[13.5px] font-medium" fill="#07192d">
                  How do today&apos;s adaptation
                </text>
                <text x="50" y="159" className="font-serif text-[13px]" fill="#64748b">
                  methods actually work?
                </text>
              </g>

              {/* ─── Question Card 3 ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("q3")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode1(activeNode1 === "q3" ? null : "q3")}
              >
                <rect
                  x="20"
                  y="204"
                  width="290"
                  height="72"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode1 === "q3" || hoveredNode === "q3" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode1 === "q3" || hoveredNode === "q3" ? "2" : "1.5"}
                  filter={activeNode1 === "q3" || hoveredNode === "q3" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="38"
                  cy="230"
                  r={activeNode1 === "q3" ? "4.5" : "3.5"}
                  fill="#047857"
                  className={activeNode1 === "q3" ? "node-pulse-anim" : ""}
                />
                <text x="50" y="231" className="font-serif text-[13.5px] font-medium" fill="#07192d">
                  Where can the steps
                </text>
                <text x="50" y="251" className="font-serif text-[13px]" fill="#64748b">
                  be made fewer and simpler?
                </text>
              </g>

              {/* ─── Target Card: Streamline ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("target")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode1(activeNode1 === "target" ? null : "target")}
              >
                <rect
                  x="20"
                  y="410"
                  width="290"
                  height="88"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode1 === "target" || hoveredNode === "target" ? "#047857" : "#cbd5e1"}
                  strokeWidth={activeNode1 === "target" || hoveredNode === "target" ? "2.5" : "2"}
                  filter={activeNode1 === "target" || hoveredNode === "target" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="42"
                  cy="438"
                  r={activeNode1 === "target" ? "6" : "5"}
                  fill="#047857"
                  className={activeNode1 === "target" ? "node-pulse-anim" : ""}
                />
                <text x="55" y="442" className="font-serif text-[17px] font-normal" fill="#07192d">
                  Streamline
                </text>
                <text x="42" y="468" className="font-serif text-[13px] italic" fill="#047857">
                  undergraduate CS students
                </text>
                <text x="42" y="486" className="font-serif text-[12.5px]" fill="#64748b">
                  exploring these questions together
                </text>
              </g>
            </svg>

            {/* Contextual Detail Card */}
            {activeNode1 && NODE_DETAILS[activeNode1] && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-300 shadow-sm text-left animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#047857] font-semibold">
                    {NODE_DETAILS[activeNode1].tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveNode1(null)}
                    className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
                <h4 className="font-serif font-medium text-[#07192d] text-sm mb-1">
                  {NODE_DETAILS[activeNode1].title}
                </h4>
                <p className="font-serif text-xs text-slate-600 leading-relaxed">
                  {NODE_DETAILS[activeNode1].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PANEL 02: What We Believe In
          ───────────────────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-28 sm:mb-36">
        {/* Left Column: Prose */}
        <div className="lg:col-span-6 reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-[#047857] font-semibold mb-6 font-serif">
            Manifesto — 02
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-[#07192d] mb-5 sm:mb-6">
            What we believe in
          </h2>
          <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-[#1e293b] leading-[1.85] font-normal">
            <p>
              Customizing a model should be simple. Today, the process demands more machinery than insight — more configuration than creativity.
            </p>
            <p>
              We believe the steps between an idea and a working model can be fewer, clearer, and far more intuitive than the current landscape allows.
            </p>
            <p className="font-instrument italic text-[#047857] text-xl sm:text-2xl leading-[1.6]">
              Intelligence should be composed, not wrestled into existence.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Flowchart 02 (Vertical Pipeline) */}
        <div className="lg:col-span-6 reveal flex flex-col items-center">
          {/* Interactive Filter Pills */}
          <div className="w-full max-w-[370px] mb-4 flex flex-wrap items-center justify-between gap-1.5 text-xs font-serif">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Pipeline Steps:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: null, label: "All" },
                { id: "b1", label: "01: Fit" },
                { id: "b2", label: "02: Friction" },
                { id: "b3", label: "03: Vision" }
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setActiveNode2(btn.id)}
                  className={`px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    activeNode2 === btn.id
                      ? "bg-[#047857] text-white border-[#047857] shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-[#047857]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[370px] relative">
            <svg
              viewBox="0 0 340 480"
              className="w-full h-auto overflow-visible select-none"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.03))" }}
            >
              {/* Branch from spine */}
              <line x1="0" y1="64" x2="20" y2="64" stroke="#047857" strokeWidth="2" />
              <circle cx="0" cy="64" r="4.5" fill="#047857" />
              <circle cx="20" cy="64" r="3.5" fill="#047857" />

              {/* Vertical connector line 1 */}
              <line
                x1="165"
                y1="108"
                x2="165"
                y2="175"
                stroke={activeNode2 === "b1" || activeNode2 === "b2" || activeNode2 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode2 === "b1" || activeNode2 === "b2" ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                className={activeNode2 === "b1" || activeNode2 === "b2" ? "flow-dash-anim" : ""}
              />
              <circle cx="165" cy="108" r="3.5" fill="#047857" />
              <circle cx="165" cy="175" r="3.5" fill="#047857" />
              <polygon points="161,168 165,175 169,168" fill="#047857" />

              {/* Vertical connector line 2 */}
              <line
                x1="165"
                y1="263"
                x2="165"
                y2="330"
                stroke={activeNode2 === "b2" || activeNode2 === "b3" || activeNode2 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode2 === "b2" || activeNode2 === "b3" ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                className={activeNode2 === "b2" || activeNode2 === "b3" ? "flow-dash-anim" : ""}
              />
              <circle cx="165" cy="263" r="3.5" fill="#047857" />
              <circle cx="165" cy="330" r="3.5" fill="#047857" />
              <polygon points="161,323 165,330 169,323" fill="#047857" />

              {/* ─── Card 1: A model almost fits ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("b1")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode2(activeNode2 === "b1" ? null : "b1")}
              >
                <rect
                  x="20"
                  y="20"
                  width="290"
                  height="88"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode2 === "b1" || hoveredNode === "b1" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode2 === "b1" || hoveredNode === "b1" ? "2" : "1.5"}
                  filter={activeNode2 === "b1" || hoveredNode === "b1" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <text x="40" y="52" className="font-serif text-[15.5px] font-medium" fill="#07192d">
                  A model almost fits
                </text>
                <text x="40" y="78" className="font-serif text-[13px]" fill="#64748b">
                  smart, but not made for your purpose
                </text>
              </g>

              {/* ─── Card 2: Today, adapting takes machinery ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("b2")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode2(activeNode2 === "b2" ? null : "b2")}
              >
                <rect
                  x="20"
                  y="175"
                  width="290"
                  height="88"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode2 === "b2" || hoveredNode === "b2" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode2 === "b2" || hoveredNode === "b2" ? "2" : "1.5"}
                  filter={activeNode2 === "b2" || hoveredNode === "b2" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <text x="40" y="207" className="font-serif text-[15.5px] font-medium" fill="#07192d">
                  Today, adapting takes machinery
                </text>
                <text x="40" y="233" className="font-serif text-[13px]" fill="#64748b">
                  more steps and tooling than it should
                </text>
              </g>

              {/* ─── Card 3: Make it feel simple (Milestone) ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("b3")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode2(activeNode2 === "b3" ? null : "b3")}
              >
                <rect
                  x="20"
                  y="330"
                  width="290"
                  height="96"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode2 === "b3" || hoveredNode === "b3" ? "#047857" : "#cbd5e1"}
                  strokeWidth={activeNode2 === "b3" || hoveredNode === "b3" ? "2.5" : "2"}
                  filter={activeNode2 === "b3" || hoveredNode === "b3" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="42"
                  cy="362"
                  r={activeNode2 === "b3" ? "6" : "5"}
                  fill="#047857"
                  className={activeNode2 === "b3" ? "node-pulse-anim" : ""}
                />
                <text x="56" y="366" className="font-serif text-[16px] font-normal" fill="#07192d">
                  Make it feel simple
                </text>
                <text x="42" y="392" className="font-serif text-[13px] italic" fill="#047857">
                  the standard we think adapting
                </text>
                <text x="42" y="410" className="font-serif text-[13px] italic" fill="#047857">
                  a model should meet
                </text>
              </g>
            </svg>

            {/* Contextual Detail Card */}
            {activeNode2 && NODE_DETAILS[activeNode2] && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-300 shadow-sm text-left animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#047857] font-semibold">
                    {NODE_DETAILS[activeNode2].tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveNode2(null)}
                    className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
                <h4 className="font-serif font-medium text-[#07192d] text-sm mb-1">
                  {NODE_DETAILS[activeNode2].title}
                </h4>
                <p className="font-serif text-xs text-slate-600 leading-relaxed">
                  {NODE_DETAILS[activeNode2].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PANEL 03: What We Do
          ───────────────────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Prose */}
        <div className="lg:col-span-6 reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-[#047857] font-semibold mb-6 font-serif">
            Manifesto — 03
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.01em] leading-[1.08] text-[#07192d] mb-5 sm:mb-6">
            What we do
          </h2>
          <div className="space-y-4 text-base sm:text-lg md:text-[1.18rem] text-[#1e293b] leading-[1.85] font-normal">
            <p>
              We start with open models and the methods people use to adapt them.
            </p>
            <p>
              We study those methods with rigor — testing, dissecting, and questioning every assumption — to find exactly where they can be made simpler, more reliable, or replaced entirely.
            </p>
            <p className="font-instrument italic text-[#047857] text-xl sm:text-2xl leading-[1.6]">
              Our work is not about building products; it is about understanding the process deeply enough to make it effortless for everyone who follows.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Flowchart 03 (Inputs -> Aims -> Demo) */}
        <div className="lg:col-span-6 reveal flex flex-col items-center">
          {/* Interactive Filter Pills */}
          <div className="w-full max-w-[370px] mb-4 flex flex-wrap items-center justify-between gap-1.5 text-xs font-serif">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Research Flow:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: null, label: "All" },
                { id: "d_open", label: "Models" },
                { id: "d_methods", label: "Methods" },
                { id: "d_aims", label: "Aims" },
                { id: "d_proj", label: "Demo" }
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setActiveNode3(btn.id)}
                  className={`px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    activeNode3 === btn.id
                      ? "bg-[#047857] text-white border-[#047857] shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-[#047857]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[370px] relative">
            <svg
              viewBox="0 0 340 550"
              className="w-full h-auto overflow-visible select-none"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.03))" }}
            >
              {/* Converging curved lines from input cards */}
              <path
                d="M85 106 C85 145, 165 140, 165 175"
                fill="none"
                stroke={activeNode3 === "d_open" || activeNode3 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode3 === "d_open" ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                className={activeNode3 === "d_open" ? "flow-dash-anim" : ""}
              />
              <path
                d="M245 106 C245 145, 165 140, 165 175"
                fill="none"
                stroke={activeNode3 === "d_methods" || activeNode3 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode3 === "d_methods" ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                className={activeNode3 === "d_methods" ? "flow-dash-anim" : ""}
              />
              <circle cx="85" cy="106" r="3.5" fill="#047857" />
              <circle cx="245" cy="106" r="3.5" fill="#047857" />
              <circle cx="165" cy="155" r="4.5" fill="#047857" />
              <polygon points="161,168 165,175 169,168" fill="#047857" />

              {/* Vertical connector from Our Aims to First Project */}
              <line
                x1="165"
                y1="325"
                x2="165"
                y2="400"
                stroke={activeNode3 === "d_aims" || activeNode3 === "d_proj" || activeNode3 === null ? "#047857" : "#cbd5e1"}
                strokeWidth={activeNode3 === "d_aims" || activeNode3 === "d_proj" ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                className={activeNode3 === "d_aims" || activeNode3 === "d_proj" ? "flow-dash-anim" : ""}
              />
              <circle cx="165" cy="325" r="3.5" fill="#047857" />
              <circle cx="165" cy="400" r="3.5" fill="#047857" />
              <polygon points="161,393 165,400 169,393" fill="#047857" />

              {/* ─── Input Card Left: Open models ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("d_open")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode3(activeNode3 === "d_open" ? null : "d_open")}
              >
                <rect
                  x="15"
                  y="20"
                  width="140"
                  height="86"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode3 === "d_open" || hoveredNode === "d_open" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode3 === "d_open" || hoveredNode === "d_open" ? "2" : "1.5"}
                  filter={activeNode3 === "d_open" || hoveredNode === "d_open" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <text x="30" y="52" className="font-serif text-[14.5px] font-medium" fill="#07192d">
                  Open models
                </text>
                <text x="30" y="74" className="font-serif text-[12.5px]" fill="#64748b">
                  already trained
                </text>
              </g>

              {/* ─── Input Card Right: Today's methods ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("d_methods")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode3(activeNode3 === "d_methods" ? null : "d_methods")}
              >
                <rect
                  x="175"
                  y="20"
                  width="145"
                  height="86"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode3 === "d_methods" || hoveredNode === "d_methods" ? "#047857" : "#e2e8f0"}
                  strokeWidth={activeNode3 === "d_methods" || hoveredNode === "d_methods" ? "2" : "1.5"}
                  filter={activeNode3 === "d_methods" || hoveredNode === "d_methods" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <text x="190" y="52" className="font-serif text-[14.5px] font-medium" fill="#07192d">
                  Today&apos;s methods
                </text>
                <text x="190" y="74" className="font-serif text-[12.5px]" fill="#64748b">
                  how models are
                </text>
                <text x="190" y="90" className="font-serif text-[12.5px]" fill="#64748b">
                  adapted now
                </text>
              </g>

              {/* ─── Middle Card: Our Aims ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("d_aims")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode3(activeNode3 === "d_aims" ? null : "d_aims")}
              >
                <rect
                  x="20"
                  y="175"
                  width="290"
                  height="150"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode3 === "d_aims" || hoveredNode === "d_aims" ? "#047857" : "#cbd5e1"}
                  strokeWidth={activeNode3 === "d_aims" || hoveredNode === "d_aims" ? "2" : "1.5"}
                  filter={activeNode3 === "d_aims" || hoveredNode === "d_aims" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <text x="40" y="206" className="font-serif text-[16px] font-medium" fill="#07192d">
                  Our aims
                </text>
                <circle cx="44" cy="232" r="2.5" fill="#047857" />
                <text x="56" y="236" className="font-serif text-[13px]" fill="#334155">
                  Understand today&apos;s methods properly
                </text>
                <circle cx="44" cy="262" r="2.5" fill="#047857" />
                <text x="56" y="266" className="font-serif text-[13px]" fill="#334155">
                  Test them ourselves with rigor
                </text>
                <circle cx="44" cy="292" r="2.5" fill="#047857" />
                <text x="56" y="296" className="font-serif text-[13px]" fill="#334155">
                  Find where the steps can be simpler
                </text>
              </g>

              {/* ─── Bottom Card: First project (Milestone) ─── */}
              <g
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode("d_proj")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode3(activeNode3 === "d_proj" ? null : "d_proj")}
              >
                <rect
                  x="20"
                  y="400"
                  width="290"
                  height="96"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeNode3 === "d_proj" || hoveredNode === "d_proj" ? "#047857" : "#cbd5e1"}
                  strokeWidth={activeNode3 === "d_proj" || hoveredNode === "d_proj" ? "2.5" : "2"}
                  filter={activeNode3 === "d_proj" || hoveredNode === "d_proj" ? "url(#emeraldGlow)" : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="42"
                  cy="430"
                  r={activeNode3 === "d_proj" ? "6" : "5"}
                  fill="#047857"
                  className={activeNode3 === "d_proj" ? "node-pulse-anim" : ""}
                />
                <text x="56" y="434" className="font-serif text-[15.5px] font-normal" fill="#07192d">
                  First project: cold-email model
                </text>
                <text x="42" y="460" className="font-serif text-[13px] italic" fill="#047857">
                  the demo we are building toward
                </text>
                <text x="42" y="478" className="font-serif text-[12.5px]" fill="#64748b">
                  focused, purpose-built post-training
                </text>
              </g>
            </svg>

            {/* Contextual Detail Card */}
            {activeNode3 && NODE_DETAILS[activeNode3] && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-300 shadow-sm text-left animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#047857] font-semibold">
                    {NODE_DETAILS[activeNode3].tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveNode3(null)}
                    className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
                <h4 className="font-serif font-medium text-[#07192d] text-sm mb-1">
                  {NODE_DETAILS[activeNode3].title}
                </h4>
                <p className="font-serif text-xs text-slate-600 leading-relaxed">
                  {NODE_DETAILS[activeNode3].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}