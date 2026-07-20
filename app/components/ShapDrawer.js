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
    <div className="font-mono text-[11px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold border border-zinc-900 px-2 py-0.5 rounded cursor-pointer transition-colors uppercase"
      >
        {isOpen ? "CLOSE_SHAP" : "VIEW_SHAP"}
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#09090b] border-l border-zinc-900 p-6 z-50 shadow-2xl shadow-black/80 animate-slideIn">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-6">
            <span className="font-bold text-zinc-400">{"// SHAP_LOCAL_FORCES"}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-600 hover:text-zinc-400 cursor-pointer font-black"
            >
              [X]
            </button>
          </div>

          <p className="text-zinc-500 leading-relaxed mb-6 text-[10px]">
            Directional force weights extracted out of the XGBoost inference layers.
          </p>

          <div className="space-y-4">
            {parsedFeatures.map((f, i) => {
              const isPositive = f.impact >= 0;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between uppercase text-[10px]">
                    <span className="text-zinc-300">{f.feature}</span>
                    <span className={isPositive ? "text-rose-400" : "text-emerald-400"}>
                      {isPositive ? `+${f.impact.toFixed(3)}` : f.impact.toFixed(3)}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-zinc-950 rounded overflow-hidden">
                    <div
                      className={`h-full ${isPositive ? "bg-rose-500/60" : "bg-emerald-500/60"}`}
                      style={{ width: `${Math.min(100, Math.abs(f.impact) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {parsedFeatures.length === 0 && (
              <span className="text-zinc-600 block text-center text-[10px] italic">
                {"// NO VECTOR HISTORIES EVALUATED"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
