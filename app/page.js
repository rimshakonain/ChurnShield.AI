"use client";

import { useState } from "react";
import Link from "next/link";

const REVIEWS = [
  { name: "Sarah Jenkins", role: "Growth at SaaSify", text: "Recovered $42k ARR in 30 days via the XGBoost pipeline." },
  { name: "Marcus Chen", role: "Retention at TelcoCorp", text: "SHAP metrics stopped guessing. Agents know exactly why users flag." },
  { name: "Elena Rostova", role: "Analytics at FinBank", text: "Flawless Next.js implementation straight out of our DB clusters." },
  { name: "David Miller", role: "Ops Lead at StreamNet", text: "Inactivity scoring is lethal. Immediate tactical insights." }
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased selection:bg-zinc-500 selection:text-white transition-colors duration-300 ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-[#fafafa] text-zinc-900"}`}>
      
      {/* 1. Header/Navigation */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all ${isDark ? "bg-[#09090b]/80 border-zinc-800/60" : "bg-white/80 border-zinc-200/60"}`}>
        <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`h-6 w-6 rounded flex items-center justify-center font-black tracking-tighter text-xs border ${isDark ? "bg-zinc-100 text-black border-white" : "bg-black text-white border-black"}`}>
              Δ
            </div>
            <span className="font-bold text-sm tracking-tight uppercase">ChurnShield.AI</span>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
            <a href="#features" className={`transition-colors ${isDark ? "hover:text-zinc-200" : "hover:text-zinc-900"}`}>Engines</a>
            <a href="#reviews" className={`transition-colors ${isDark ? "hover:text-zinc-200" : "hover:text-zinc-900"}`}>Metrics</a>
            <a href="#modules" className={`transition-colors ${isDark ? "hover:text-zinc-200" : "hover:text-zinc-900"}`}>Sectors</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`text-xs px-3 py-1.5 rounded border font-mono tracking-tight transition-all ${isDark ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900" : "border-zinc-200 bg-zinc-100/50 hover:bg-zinc-100"}`}
            >
              {isDark ? "LIGHT_MODE" : "DARK_MODE"}
            </button>
            <Link 
              href="/dashboard" 
              className={`text-xs font-semibold px-4 py-1.5 rounded tracking-tight transition-all border ${isDark ? "bg-zinc-100 text-black border-white hover:bg-zinc-200" : "bg-black text-white border-black hover:opacity-90"}`}
            >
              Console ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Display Wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center">
        
        {/* 2. Hero Core Typography */}
        <section className="text-center flex flex-col items-center relative z-10 max-w-4xl mb-24">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-[10px] font-mono tracking-widest uppercase mb-8 ${isDark ? "border-zinc-800/80 bg-zinc-900/30 text-zinc-400" : "border-zinc-200 bg-zinc-100 text-zinc-600"}`}>
            ⚡ STATUS // ENTERPRISE RETENTION ENGINE IS ONLINE
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-8 uppercase">
            Predict Retention Value.<br />
            <span className={isDark ? "text-zinc-600" : "text-zinc-400"}>Automate mitigation.</span>
          </h1>
          
          <p className={`max-w-xl text-sm sm:text-base mb-10 font-normal leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            A deep telemetry ecosystem integrating machine learning scoring vectors with structural localized SHAP variables to protect dynamic asset pipelines.
          </p>

          <div className="flex gap-3 justify-center w-full max-w-xs">
            <Link
              className={`flex-1 h-11 flex items-center justify-center rounded text-xs font-bold tracking-wide uppercase transition-all ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:opacity-90"}`}
              href="/dashboard"
            >
              Launch Core Console
            </Link>
          </div>
        </section>

                {/* 3. The Bento Grid Section */}
        <section id="features" className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          
          {/* Bento Card 1: High Contrast Metric Card */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-48 md:col-span-2 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Model Accuracy Threshold</div>
              <div className="text-5xl font-extrabold tracking-tighter mt-2">94.20%</div>
            </div>
            <div className="text-xs text-zinc-500 font-mono tracking-tight">
              {"// OPTIMIZED THROUGH GRADIENT BOOSTING TREES"}
            </div>
          </div>

          {/* Bento Card 2: Speed Framework */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-48 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">SHAP Array Computations</div>
              <div className="text-4xl font-extrabold tracking-tighter mt-2 text-zinc-500 font-mono">&lt;45ms</div>
            </div>
            <div className="text-xs text-zinc-400 font-medium">Real-time explanatory evaluation variables.</div>
          </div>


          {/* Bento Card 3: Retention Capabilities */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-56 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div>
              <span className="text-lg">📱</span>
              <h3 className="font-bold text-sm mt-3 mb-1 uppercase tracking-tight">Telecom Matrix</h3>
              <p className="text-zinc-500 text-xs leading-normal">Maps usage decay loops, credit delays, and support logs onto targeted account updates.</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">LAYER_01 // SECURE</span>
          </div>

          {/* Bento Card 4: Financial Capacity Monitor */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-56 md:col-span-2 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-lg">🏦</span>
                  <h3 className="font-bold text-sm mt-3 mb-1 uppercase tracking-tight">Banking Telemetry</h3>
                  <p className="text-zinc-500 text-xs leading-normal">Monitors transactional flow drop-off and capital balance velocity drainage parameters.</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">LAYER_02 // SYSTEM</span>
              </div>
              <div className={`rounded-lg border p-4 flex flex-col justify-center text-center ${isDark ? "border-zinc-800 bg-zinc-950/80" : "border-zinc-200 bg-white"}`}>
                <div className="text-[9px] font-mono uppercase text-zinc-400 tracking-widest">Average Mitigation Success</div>
                <div className="text-3xl font-black text-emerald-500 mt-1">22.40%</div>
              </div>
            </div>
          </div>

          {/* Bento Card 5: SaaS Telemetry Tracker */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-52 md:col-span-2 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div>
              <span className="text-lg">💻</span>
              <h3 className="font-bold text-sm mt-3 mb-1 uppercase tracking-tight">SaaS Core Adoption Mapping</h3>
              <p className="text-zinc-500 text-xs leading-normal max-w-md">Calculates operational workspace logs, seat allocation drops, and engagement indicators to trigger systemic retention workflows.</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">LAYER_03 // RE-ENGAGE</span>
          </div>

          {/* Bento Card 6: E-Commerce Tracker */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between h-52 ${isDark ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-zinc-50/50"}`}>
            <div>
              <span className="text-lg">🛒</span>
              <h3 className="font-bold text-sm mt-3 mb-1 uppercase tracking-tight">Commerce Analytics</h3>
              <p className="text-zinc-500 text-xs leading-normal">Processes frequency drop-offs and subscription drop markers instantly.</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">LAYER_04 // LIVE</span>
          </div>
        </section>

        {/* 4. Minimalist Customer Reviews Loop */}
        <section id="reviews" className={`w-full py-10 border-y relative overflow-hidden select-none ${isDark ? "bg-zinc-900/10 border-zinc-800/60" : "bg-zinc-50/30 border-zinc-200/60"}`}>
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full will-change-transform hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((item, idx) => (
              <div 
                key={idx} 
                className={`inline-block whitespace-normal w-72 shrink-0 p-5 rounded border ${isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}`}
              >
                <p className={`text-xs leading-relaxed mb-4 font-mono uppercase tracking-tight ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                  “{item.text}”
                </p>
                <div className="flex flex-col">
                  <span className="font-bold text-xs tracking-tight">{item.name}</span>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono mt-0.5">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

            {/* 5. Minimalist Footer */}
      <footer className={`w-full border-t transition-colors ${isDark ? "border-zinc-800/60 bg-[#09090b]" : "border-zinc-200/60 bg-white"}`}>
        <div className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-mono gap-4">
          <span>{"// TOTAL RETENTION PLATFORM CORE SYSTEMS © "}{new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors uppercase">Data_Security</a>
            <a href="#" className="hover:text-zinc-300 transition-colors uppercase">Core_API_v1</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
