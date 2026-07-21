"use client";

import { useState } from "react";

export default function ShapDrawer({ shapData }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!shapData) return null;

  // Safe JSON extraction boundary
  let rawObject = {};
  try {
    rawObject = typeof shapData === "string" ? JSON.parse(shapData) : shapData || {};
  } catch (e) {
    console.error("SHAP Parsing error:", e);
  }

  // 🌟 FIX: Convert your key-value object metrics dynamically into an array matrix
  // Filters out structural metadata to prevent rendering empty broken bars
  const parsedFeatures = Object.entries(rawObject)
    .filter(([key]) => key !== "base_value" && key !== "system_status")
    .map(([key, value]) => ({
      feature: key.replace("_weight", "").replace("_", " "),
      impact: Number(value) || 0
    }));

  return (
    <div className="font-mono text-[11px]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[10px] font-bold border px-2 py-0.5 rounded cursor-pointer transition-colors uppercase border-[#567C8D]/40 bg-[#567C8D]/10 text-[#C8D9E6] hover:bg-[#567C8D]/20"
      >
        {isOpen ? "CLOSE_SHAP" : "VIEW_SHAP"}
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-80 p-6 z-50 shadow-2xl border-l border-[#567C8D]/30 bg-[#2F4156] shadow-black/40 animate-slideIn">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#567C8D]/20">
            <span className="font-bold text-[#C8D9E6]">{"// SHAP_LOCAL_FORCES"}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer font-black text-[#C8D9E6] hover:text-white"
            >
              [X]
            </button>
          </div>

          <p className="leading-relaxed mb-6 text-[10px] text-[#F5EFEB]/70">
            Directional force weights extracted out of the XGBoost inference layers.
          </p>

          <div className="space-y-4">
            {parsedFeatures.map((f, i) => {
              const isPositive = f.impact >= 0;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between uppercase text-[10px]">
                    <span className="text-[#F5EFEB]/90">{f.feature}</span>
                    <span className={isPositive ? "text-rose-300" : "text-emerald-300"}>
                      {isPositive ? `+${f.impact.toFixed(3)}` : f.impact.toFixed(3)}
                    </span>
                  </div>
                  <div className="h-1 w-full rounded overflow-hidden bg-black/20 border border-[#567C8D]/10">
                    <div
                      className={`h-full rounded-sm ${isPositive ? "bg-rose-400" : "bg-emerald-400"}`}
                      style={{ width: `${Math.min(100, Math.abs(f.impact) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {parsedFeatures.length === 0 && (
              <span className="block text-center text-[10px] italic text-[#C8D9E6]/50">
                {"// NO VECTOR HISTORIES EVALUATED"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
