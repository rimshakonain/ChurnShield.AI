"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { executeTelemetryInference } from "../actions/pipeline";

export default function AnalyzeButton({ customerId }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState(null);
    const [hasError, setHasError] = useState(false);
    const router = useRouter();

    const handleAnalyze = (e) => {
        // Prevent click events from triggering row-selection URL parameters in the parent table link
        e.stopPropagation();
        setHasError(false);

        startTransition(async () => {
            const response = await executeTelemetryInference(customerId);
            
            if (response && response.success) {
                setResult({
                    tier: response.tier, // Will be CRITICAL, ELEVATED, or STABLE matching our pipeline
                    prob: (response.probability * 100).toFixed(1)
                });
                
                // Force Next.js server components to fetch fresh live matrix values instantly
                router.refresh();
            } else {
                // Eliminate the ugly system alert and route the error message directly to the inline UI
                setHasError(true);
                console.error(`Analysis Error: ${response?.error || "Unknown pipeline crash"}`);
                
                // Clear out error banner automatically after 4 seconds
                setTimeout(() => setHasError(false), 4000);
            }
        });
    };

    return (
        <div className="flex items-center justify-end gap-3 font-mono" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            {/* 🛡️ Aligned Client Risk-Tier Metrics Badges */}
            {result && !hasError && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all animate-in fade-in duration-200 ${
                    result.tier === "CRITICAL" || result.tier === "HIGH"
                        ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                        : result.tier === "ELEVATED" || result.tier === "MEDIUM"
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    }`}>
                    {result.tier} {" // "} {result.prob}%
                </span>
            )}

            {/* 🛑 Inline Engine Error Tracker (Replaces System Alert Window) */}
            {hasError && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-rose-500/10 text-rose-300 border-rose-500/20 animate-in fade-in duration-150">
                    ✕ ENGINE_FAIL
                </span>
            )}

            {/* Interactive Inline Action Core Trigger */}
            <button
                onClick={handleAnalyze}
                disabled={isPending}
                className={`text-[10px] font-bold px-3 py-1 rounded border tracking-tight uppercase transition-all select-none disabled:opacity-40 ${
                    isPending
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300 cursor-not-allowed animate-pulse"
                        : "border-[#567C8D]/40 bg-[#567C8D]/10 text-[#C8D9E6] hover:text-white hover:bg-[#567C8D]/20 cursor-pointer"
                    }`}
            >
                {isPending ? (
                    <span className="flex items-center gap-1.5">
                        {/* Minimalistic Inline UI Vector Spinner */}
                        <svg className="animate-spin h-2.5 w-2.5 text-amber-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        SCORING...
                    </span>
                ) : (
                    "SCORE_NODE ↗"
                )}
            </button>
        </div>
    );
}
