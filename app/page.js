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

  // Elite corporate font stack inline safety override
  const corporateFontFamily = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

  return (
    <div
      className={`min-h-screen flex flex-col antialiased selection:bg-[#567C8D] selection:text-white transition-colors duration-200 ${isDark ? "bg-[#2F4156] text-[#F5EFEB]" : "bg-[#F5EFEB] text-[#2F4156]"
        }`}
      style={corporateFontFamily}
    >

      {/* 1. NAVIGATION HUB (Ecosystem-Wide Tracking Stretch) */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 ${isDark ? "bg-[#2F4156]/90 border-[#567C8D]/30" : "bg-[#F5EFEB]/90 border-[#C8D9E6]"
        }`}>
        <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between">

          {/* Logo Frame */}
          <div className="flex items-center gap-2.5">
            <div className={`h-6 w-6 rounded flex items-center justify-center font-bold text-xs border ${isDark ? "bg-[#567C8D] text-white border-[#567C8D]" : "bg-[#2F4156] text-white border-[#2F4156]"
              }`}>
              Δ
            </div>
            <span className={`font-bold text-sm tracking-tight ${isDark ? "text-white" : "text-[#2F4156]"}`}>
              ChurnShield.AI
            </span>
          </div>

          {/* Navigation Tracks */}
          <nav className={`hidden md:flex items-center gap-8 text-xs font-bold tracking-wide ${isDark ? "text-[#C8D9E6]/80" : "text-[#567C8D]"
            }`}>
            <a href="#features" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#2F4156]"}`}>Features</a>
            <a href="#reviews" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#2F4156]"}`}>Case Studies</a>
            <a href="#modules" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#2F4156]"}`}>Sectors</a>
          </nav>


          {/* Theme & Access Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`text-xs px-3 py-1.5 rounded border font-bold transition-colors ${isDark ? "border-[#567C8D]/40 bg-[#567C8D]/10 text-[#C8D9E6] hover:bg-[#567C8D]/20" : "border-[#C8D9E6] bg-white text-[#567C8D] hover:bg-[#C8D9E6]/20"
                }`}
            >
              {isDark ? "Light Presentation" : "Dark Presentation"}
            </button>
            <Link
              href="/dashboard"
              className={`text-xs font-bold px-4 py-1.5 rounded transition-colors ${isDark ? "bg-[#567C8D] text-white hover:bg-[#4a6b7a]" : "bg-[#2F4156] text-white hover:bg-[#233142]"
                }`}
            >
              Open Console
            </Link>
          </div>
        </div>
      </header>

      {/* CORE DISPLAY CONTAINER (Stretched edge-to-edge with standard grid gutters) */}
      <main className="flex-1 w-full px-6 md:px-12 py-12 lg:py-16 flex flex-col gap-16">

        {/* 2. FULL WIDTH ASYMMETRIC HERO SPLIT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* LEFT PANEL: HERO TYPOGRAPHY ACTION AREA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold mb-6 ${isDark ? "border-[#567C8D]/30 bg-[#567C8D]/10 text-[#C8D9E6]" : "border-[#C8D9E6] bg-white text-[#567C8D]"
              }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#567C8D]" />
              Enterprise Retention System Online
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-6 ${isDark ? "text-white" : "text-[#2F4156]"
              }`}>
              PREDICT RETENTION VALUE.<br />
              <span className={isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}>AUTOMATE MITIGATION.</span>
            </h1>


            <p className={`max-w-2xl text-xs sm:text-sm mb-8 font-normal leading-relaxed ${isDark ? "text-[#F5EFEB]/80" : "text-[#2F4156]/90"
              }`}>
              A deep telemetry ecosystem integrating machine learning scoring vectors with structural localized SHAP variables to protect dynamic asset pipelines.
            </p>

            <div className="w-full max-w-xs">
              <Link
                className={`w-full h-11 flex items-center justify-center rounded text-xs font-bold transition-colors ${isDark ? "bg-[#567C8D] text-white hover:bg-[#4a6b7a]" : "bg-[#2F4156] text-white hover:bg-[#233142]"
                  }`}
                href="/dashboard"
              >
                Launch Dashboard Console
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL: THREE IMAGE UPLOAD SLOTS */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative w-full">

            {/* Design Image Placeholder 1 */}
            <div className={`p-4 rounded border flex items-center gap-4 w-full ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
              }`}>
              <div className="h-10 w-10 shrink-0 rounded bg-[#C8D9E6]/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/2.jpg"
                  alt="Database Map"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Database Visual Map</div>
                <div className={`text-xs font-normal truncate ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>telemetry_distribution_flux.png</div>
              </div>
            </div>

            {/* Design Image Placeholder 2 */}
            <div className={`p-4 rounded border flex items-center gap-4 w-full ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
              }`}>
              <div className="h-10 w-10 shrink-0 rounded bg-[#C8D9E6]/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/5.png"
                  alt="ML Clusters"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>ML Training Segment</div>
                <div className={`text-xs font-normal truncate ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>active_inference_clusters.png</div>
              </div>
            </div>

            {/* Design Image Placeholder 3 */}
            <div className={`p-4 rounded border flex items-center gap-4 w-full ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
              }`}>
              <div className="h-10 w-10 shrink-0 rounded bg-[#C8D9E6]/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/4.jpg"
                  alt="SHAP Matrix"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>SHAP Matrix Analytics</div>
                <div className={`text-xs font-normal truncate ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>explainable_factor_attribution.png</div>
              </div>
            </div>

          </div>
        </section>


        {/* 3. BENTO PARAMETER MATRIX (Expanded Across Edge Paths) */}
        <section id="features" className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Precision High-Contrast Metrics */}
          <div className={`p-6 rounded border flex flex-col justify-between h-44 md:col-span-2 ${isDark ? "border-[#567C8D]/20 bg-[#567C8D]/10" : "border-[#C8D9E6] bg-[#C8D9E6]/20"
            }`}>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Model Accuracy Threshold</span>
              <div className={`text-4xl font-bold tracking-tight mt-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>94.20%</div>
            </div>
            <span className={`text-xs font-bold ${isDark ? "text-[#C8D9E6]/60" : "text-[#567C8D]"}`}>
              Optimized Through Gradient Boosting Trees
            </span>
          </div>

          {/* Card 2: Array Evaluation Latency */}
          <div className={`p-6 rounded border flex flex-col justify-between h-44 ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
            }`}>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>SHAP Array Computations</span>
              <div className={`text-4xl font-bold tracking-tight mt-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>&lt; 45ms</div>
            </div>
            <p className={`text-xs ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>Real-time explanatory evaluation variables.</p>
          </div>

          {/* Card 3: Telecom Industry Module */}
          <div className={`p-6 rounded border flex flex-col justify-between h-48 ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
            }`}>
            <div>
              <h3 className={`font-bold text-sm mb-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>Telecom Matrix</h3>
              <p className={`text-xs leading-normal ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>Maps usage decay loops, credit delays, and support logs onto targeted account updates.</p>
            </div>
            <span className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Layer 01 // Secure</span>
          </div>

          {/* Card 4: Financial Balance Tracking Arena */}
          <div className={`p-6 rounded border flex flex-col justify-between h-48 md:col-span-2 ${isDark ? "border-[#567C8D]/20 bg-[#567C8D]/10" : "border-[#C8D9E6] bg-[#C8D9E6]/20"
            }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className={`font-bold text-sm mb-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>Banking Telemetry</h3>
                  <p className={`text-xs leading-normal ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>Monitors transactional flow drop-off and capital balance velocity drainage parameters.</p>
                </div>
                <span className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Layer 02 // System</span>
              </div>
              <div className={`rounded p-4 flex flex-col justify-center text-center ${isDark ? "border border-[#567C8D]/30 bg-[#2F4156]" : "border border-[#C8D9E6] bg-white"
                }`}>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Average Mitigation Success</span>
                <div className="text-3xl font-bold text-emerald-500 mt-1">22.40%</div>
              </div>
            </div>
          </div>

          {/* Card 5: Enterprise SaaS Trackers */}
          <div className={`p-6 rounded border flex flex-col justify-between h-48 md:col-span-2 ${isDark ? "border-[#567C8D]/20 bg-[#567C8D]/10" : "border-[#C8D9E6] bg-[#C8D9E6]/20"
            }`}>
            <div>
              <h3 className={`font-bold text-sm mb-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>SaaS Core Adoption Mapping</h3>
              <p className={`text-xs leading-normal max-w-md ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>Calculates operational workspace logs, seat allocation drops, and engagement indicators to trigger systemic retention workflows.</p>
            </div>
            <span className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Layer 03 // Re-Engage</span>
          </div>

          {/* Card 6: Commerce Metrics System */}
          <div className={`p-6 rounded border flex flex-col justify-between h-48 ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
            }`}>
            <div>
              <h3 className={`font-bold text-sm mb-2 ${isDark ? "text-white" : "text-[#2F4156]"}`}>Commerce Analytics</h3>
              <p className={`text-xs leading-normal ${isDark ? "text-[#F5EFEB]/60" : "text-[#2F4156]/70"}`}>Processes transaction frequency drops and subscription drop markers instantly.</p>
            </div>
            <span className={`text-[10px] font-bold ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>Layer 04 // Live</span>
          </div>
        </section>

                {/* 4. PERFORMANCE VERIFICATION CASE STUDIES */}
        <section id="reviews" className={`w-full py-10 border-y relative overflow-hidden select-none ${
          isDark ? "bg-[#567C8D]/10 border-[#567C8D]/20" : "bg-[#C8D9E6]/10 border-[#C8D9E6]"
        }`}>
          {/* Note: Ensure your global CSS animation class `animate-marquee` has a fast duration (e.g., duration-15s or duration-20s instead of 40s) */}
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full [animation-duration:15s] will-change-transform hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((item, idx) => (
              <div
                key={idx}
                className={`inline-block whitespace-normal w-72 shrink-0 p-5 rounded border ${
                  isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-white"
                }`}
              >
                {/* ⭐️ Five Star Rating Cluster */}
                <div className="flex gap-0.5 mb-3 text-amber-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className={`text-xs leading-relaxed mb-4 font-bold ${isDark ? "text-white" : "text-[#2F4156]"}`}>
                  “{item.text}”
                </p>
                <div className="flex flex-col border-t border-slate-500/10 pt-2">
                  <span className={`font-bold text-xs tracking-tight ${isDark ? "text-white" : "text-[#2F4156]"}`}>{item.name}</span>
                  <span className={`text-[10px] font-bold mt-0.5 ${isDark ? "text-[#C8D9E6]" : "text-[#567C8D]"}`}>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 5. METRIC SYSTEM FOOTER */}
      <footer className={`w-full border-t transition-colors ${isDark ? "border-[#567C8D]/20 bg-[#2F4156]" : "border-[#C8D9E6] bg-[#F5EFEB]"
        }`}>
        <div className={`w-full px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold gap-4 ${isDark ? "text-[#C8D9E6]/60" : "text-[#567C8D]"
          }`}>
          <span>Data Security Framework Framework Baseline © {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <a href="#" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#2F4156]"}`}>Data Privacy</a>
            <a href="#" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#2F4156]"}`}>Core API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
