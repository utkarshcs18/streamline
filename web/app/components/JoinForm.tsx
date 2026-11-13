"use client";

import { FormEvent, useState, useEffect } from "react";
import { useCountUp } from "../hooks/useReveal";

type State = { status: "idle" | "loading" | "done" | "error"; message?: string };

export default function JoinForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const countRef = useCountUp(waitlistCount ?? 0);

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && typeof data.count === "number") {
          setWaitlistCount(data.count);
        }
      })
      .catch(() => {
        setWaitlistCount(null);
      });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          interest: data.get("interest"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState({ status: "done", message: json.message });
      if (typeof json.count === "number") {
        setWaitlistCount(json.count);
      } else if (waitlistCount !== null) {
        setWaitlistCount((prev) => (prev !== null ? prev + 1 : 1));
      }
      form.reset();
    } catch (err) {
      setState({ status: "error", message: (err as Error).message });
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 font-serif">
      {/* ─── Top Badges: Waitlist Counter & Drop Announcement ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-2">
        {waitlistCount !== null && waitlistCount > 0 && (
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-xs sm:text-sm text-emerald-900 font-serif shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>
              <strong ref={countRef} className="font-instrument text-base text-slate-900 tabular-nums">
                {waitlistCount}
              </strong>{" "}
              on the waitlist
            </span>
          </div>
        )}

        <div className="reveal inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/90 px-4 py-1.5 text-xs sm:text-sm text-amber-950 font-serif shadow-xs">
          <span className="text-amber-600 font-bold">✦</span>
          <span>
            Stay Tuned{" "}
            <strong className="font-instrument text-base text-amber-900 italic">December </strong>
          </span>
        </div>
      </div>

      {/* ─── Join Waitlist Form ─── */}
      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-sm sm:max-w-md flex-col gap-3 text-left font-serif"
      >
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="rounded-xl border border-slate-300 bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 text-base text-slate-900 font-serif outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
        />
        <input
          name="interest"
          type="text"
          maxLength={500}
          placeholder="What are you exploring? (optional)"
          className="rounded-xl border border-slate-300 bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 text-base text-slate-900 font-serif outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="w-full rounded-xl bg-[#07192d] hover:bg-[#064e3b] px-5 py-3.5 font-serif text-lg text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
        >
          {state.status === "loading" ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            <span className="font-instrument tracking-wide">Join the Waitlist →</span>
          )}
        </button>

        {state.message && (
          <p
            role="status"
            className={`min-h-6 text-center text-sm font-serif ${
              state.status === "error" ? "text-red-600" : "text-emerald-700 font-medium"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}