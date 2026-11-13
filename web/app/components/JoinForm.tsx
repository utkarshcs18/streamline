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
    <div className="w-full flex flex-col items-center gap-3 font-serif">
      {/* Live dynamic counter with animated count-up */}
      {waitlistCount !== null && waitlistCount > 0 && (
        <div className="reveal inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 sm:px-5 sm:py-2 text-sm text-emerald-200 font-serif backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span>
            <strong ref={countRef} className="font-instrument text-base text-white tabular-nums">
              {waitlistCount}
            </strong>{" "}
            on the waitlist
          </span>
        </div>
      )}

      {/* Project drop announcement */}
      <div className="reveal inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-400/30 bg-amber-950/40 px-4 py-1.5 sm:px-5 sm:py-2 text-sm text-amber-200 font-serif backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
        <span className="text-amber-400">✦</span>
        <span>
          First project drops{" "}
          <strong className="font-instrument text-base text-amber-100 italic">December 19th</strong>
        </span>
      </div>

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
          className="rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 sm:px-5 sm:py-3.5 text-base text-white font-serif outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-slate-900/90 focus:ring-1 focus:ring-emerald-400/40 backdrop-blur-md shadow-inner"
        />
        <input
          name="interest"
          type="text"
          maxLength={500}
          placeholder="What are you exploring? (optional)"
          className="rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 sm:px-5 sm:py-3.5 text-base text-white font-serif outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-slate-900/90 focus:ring-1 focus:ring-emerald-400/40 backdrop-blur-md shadow-inner"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="w-full rounded-xl bg-white px-5 py-3.5 font-serif text-lg text-slate-950 transition-colors duration-200 hover:bg-emerald-300 disabled:opacity-50 cursor-pointer shadow-md"
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
              state.status === "error" ? "text-red-300" : "text-emerald-300"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
