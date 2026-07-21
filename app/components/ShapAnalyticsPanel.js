"use client";

import { useState, useEffect } from "react";

export default function ShapAnalyticsPanel({ activeNode, predictionLogsList = [] }) {
    // Gracefully grab the latest item from the array stream to populate the operational baseline
    const predictionLog = predictionLogsList[0] || null;

    // 🎛️ SIMULATOR STATE VECTORS (FEATURE 9: WHAT-IF SIMULATOR)
    const [complaints, setComplaints] = useState(0);
    const [inactivity, setInactivity] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [simulatedRisk, setSimulatedRisk] = useState(0);

    // Synchronize interactive inputs whenever a separate node is targeted inside the parent monitor table
    useEffect(() => {
        if (activeNode) {
            setComplaints(activeNode.complaintCount || 0);
            setInactivity(activeNode.inactivityDays || 0);
            setFrequency(activeNode.usageFrequency || 0);
        }
    }, [activeNode]);

    // Recalculate simulation matrix scores on state changes using your FastAPI statistical logistic logit rules
    useEffect(() => {
        if (!activeNode) return;

        let baseLogit = -1.5;
        baseLogit += complaints * 0.42;
        baseLogit += inactivity * 0.05;
        baseLogit += frequency * -0.15;
        baseLogit += Number(activeNode.monthlySpending) * 0.0008;

        const probability = 1.0 / (1.0 + Math.exp(-baseLogit));
        setSimulatedRisk(Math.min(99, Math.max(1, probability * 100)));
    }, [complaints, inactivity, frequency, activeNode]);

    // Early return state guard if no account node selection context parameter is loaded into the router
    if (!activeNode) {
        return (
            <div className="border border-dashed border-zinc-900 rounded-xl p-6 bg-zinc-900/5 flex flex-col items-center justify-center min-h-[320px] font-mono text-[11px] text-zinc-500">
                <span>{"// PIPELINE_LOG_EMPTY"}</span>
                <p className="text-[10px] mt-1 text-center max-w-xs text-zinc-600">Select an active account footprint node from the tracking queue matrix to view model impact insights.</p>
            </div>
        );
    }

    let shapData = {};
    let playbookRecommendations = [];

    try {
        if (predictionLog) {
            shapData = typeof predictionLog.shapExplanations === "string"
                ? JSON.parse(predictionLog.shapExplanations)
                : predictionLog.shapExplanations || {};

            playbookRecommendations = predictionLog.recommendations || [];
        }
    } catch (e) {
        console.error("String evaluation data failure", e);
    }

    const baseProbabilityScore = predictionLog ? predictionLog.churnProbability : (activeNode.complaintCount > 3 ? 0.45 : 0.05);
    const probabilityPercent = (baseProbabilityScore * 100).toFixed(1);
    const riskTierValue = predictionLog ? String(predictionLog.riskClassification).toUpperCase() : (baseProbabilityScore >= 0.45 ? "CRITICAL" : "STABLE");

    const weights = [
        { label: "COMPLAINT COUNT IMPACT", val: shapData.complaint_count_weight || 0 },
        { label: "INACTIVITY INTERVAL", val: shapData.inactivity_days_weight || 0 },
        { label: "USAGE DENSITY BIAS", val: shapData.usage_frequency_weight || 0 },
        { label: "CONTRACT VALUE SCALE", val: shapData.monthly_spending_weight || 0 }
    ];

    // ✉️ ACTIONS MAIL GENERATOR STRING (FEATURE 5: RECOMMENDATION GENERATOR)
    const structuralMailerTemplateText = `DEAR SYSTEM ACCOUNT MONITOR FOR ${String(activeNode.accountNode).toUpperCase()},

WE ARE NOTICING RECENT ADAPTATION CHANGES REGARDING OPERATIONAL USAGE SIGNALS ACROSS CONTRACTS LINKED TO YOUR BUSINESS SINK GROUP. 

A MITIGATION REVIEW REVEALS A Live RISK VECTOR PROFILE TIED TO AN EXPECTED RISK PROBABILITY INTENSITY OF ${probabilityPercent}%. AN AUTOMATED SERVICE WAIVER HAS BEEN GENERATED FOR DEPLOYMENT ACCORDINGLY.

RETENTION COMPLIANCE SECTOR // CHURN.AI PLATFORM`;

    return (
        <div className="border rounded-xl p-5 font-mono text-[11px] space-y-5 animate-in fade-in duration-200 border-[#567C8D]/20 bg-[#2F4156]">

            {/* 🏢 FEATURE 1: CUSTOMER 360° PROFILE SCHEMATICS CONTAINER HEADER */}
            <div className="border-b pb-3 space-y-2 border-[#567C8D]/20">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[#C8D9E6] font-bold uppercase text-[9px]">{"// CUSTOMER_360_VIEW"}</span>
                        <h4 className="text-white text-xs font-black tracking-tight uppercase mt-0.5">{activeNode.accountNode}</h4>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 font-bold rounded border uppercase ${riskTierValue === "CRITICAL" || riskTierValue === "HIGH"
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                        : riskTierValue === "ELEVATED" || riskTierValue === "MEDIUM"
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        }`}>
                        {riskTierValue}
                    </span>
                </div>

                {/* System parameters metadata specs breakdown */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1.5 text-[10px] text-[#C8D9E6]/70 border-t border-[#567C8D]/10">
                    <div>INDUSTRY SINK: <span className="text-white">{activeNode.industry}</span></div>
                    <div>CONTRACT ALLOC: <span className="text-white">${Number(activeNode.monthlySpending).toFixed(0)}/mo</span></div>
                    <div>COMPLAINTS FILE: <span className="text-white">{activeNode.complaintCount} TICKET LOGS</span></div>
                    <div>INACTIVITY GAP: <span className="text-white">{activeNode.inactivityDays} DAYS IDLE</span></div>
                </div>
            </div>

            {/* 📈 FEATURE 2: HISTORICAL CHURN TIMELINE TRACKER LINE */}
            <div className="space-y-2 p-3 rounded-lg border bg-black/10 border-[#567C8D]/10">
                <span className="text-[9px] text-[#C8D9E6] font-bold tracking-tight block">{"// HISTORICAL_CHURN_TIMELINE_TRENDS"}</span>
                <div className="flex items-center justify-between text-[10px] text-[#C8D9E6]/60 pt-1">
                    {predictionLogsList.length > 0 ? (
                        predictionLogsList.slice(0, 4).reverse().map((log, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="text-center">
                                    <div className="text-[8px] text-[#C8D9E6]/40">RUN {predictionLogsList.length - (predictionLogsList.length - 1 - index)}</div>
                                    <div className={`font-bold mt-0.5 ${log.churnProbability >= 0.65 ? "text-rose-300" : log.churnProbability >= 0.35 ? "text-amber-300" : "text-emerald-300"}`}>
                                        {(log.churnProbability * 100).toFixed(0)}%
                                    </div>
                                </div>
                                {index < Math.min(predictionLogsList.length, 4) - 1 && <span className="text-[#567C8D]/30">→</span>}
                            </div>
                        ))
                    ) : (
                        <span className="text-[#C8D9E6]/40 italic text-[10px] pl-0.5">No evaluation matrices calculated for selected target.</span>
                    )}
                </div>
            </div>

            {/* Aggregate Score Matrix Meter */}
            <div className="space-y-1.5 p-3 rounded-lg border bg-black/15 border-[#567C8D]/15">
                <div className="flex justify-between text-[10px] text-[#C8D9E6]">
                    <span>CHURN PROBABILITY MODEL EXPOSURE</span>
                    <span className="font-bold text-white">{probabilityPercent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-black/20">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${baseRiskProbabilityScore >= 0.65 ? "bg-rose-400" : baseRiskProbabilityScore >= 0.35 ? "bg-amber-400" : "bg-emerald-400"
                            }`}
                        style={{ width: `${probabilityPercent}%` }}
                    />
                </div>
            </div>

            {/* Localized Feature Contribution Chart Blocks */}
            <div className="space-y-3.5">
                <span className="text-[10px] uppercase tracking-wider block text-[#C8D9E6]/80">Local Feature Weight Vectors:</span>
                <div className="space-y-3">
                    {weights.map((item, idx) => {
                        const isPositive = item.val >= 0;
                        const absoluteWidth = Math.min(Math.abs(item.val) * 100, 100).toFixed(1);

                        return (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-[#F5EFEB]/80">{item.label}</span>
                                    <span className={isPositive ? "text-rose-300" : "text-emerald-300"}>
                                        {isPositive ? `+${item.val.toFixed(4)}` : item.val.toFixed(4)}
                                    </span>
                                </div>

                                <div className="w-full h-3 border rounded relative overflow-hidden flex bg-black/10 border-[#567C8D]/10">
                                    <div className="w-1/2 h-full flex justify-end border-r border-[#567C8D]/10">
                                        {!isPositive && (
                                            <div
                                                className="border-y border-l h-full transition-all duration-300 bg-emerald-500/10 border-emerald-500/30"
                                                style={{ width: `${absoluteWidth}%` }}
                                            />
                                        )}
                                    </div>
                                    <div className="w-1/2 h-full">
                                        {isPositive && (
                                            <div
                                                className="border-y border-r h-full transition-all duration-300 bg-rose-500/10 border-rose-500/30"
                                                style={{ width: `${absoluteWidth}%` }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* 🎛️ FEATURE 9: OPERATIONAL WHAT-IF SIMULATOR CONSOLE COMPONENT */}
            <div className="space-y-3 p-3 rounded-lg border bg-black/20 border-[#567C8D]/20">
                <div className="flex justify-between items-center border-b pb-1.5 border-[#567C8D]/20">
                    <span className="text-[10px] text-zinc-300 font-bold">{"// RISK_WHAT_IF_SIMULATOR"}</span>
                    <div className="text-right">
                        <span className="text-[8px] text-zinc-500 block">SIMULATED MATRIX</span>
                        <span className={`font-black text-xs ${simulatedRisk >= 65 ? "text-rose-400" : simulatedRisk >= 35 ? "text-amber-400" : "text-emerald-400"}`}>
                            {simulatedRisk.toFixed(0)}% RISK
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-400">
                            <span>SUPPORT COMPLAINT TICKETS</span>
                            <span className="text-zinc-300">{complaints} ATTEMPTS</span>
                        </div>
                        <input type="range" min="0" max="10" value={complaints} onChange={(e) => setComplaints(parseInt(e.target.value, 10))} className="w-full h-1 rounded cursor-pointer accent-[#567C8D] bg-black/40" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-400">
                            <span>INACTIVITY INTERVAL PING</span>
                            <span className="text-zinc-300">{inactivity} IDLE DAYS</span>
                        </div>
                        <input type="range" min="0" max="30" value={inactivity} onChange={(e) => setInactivity(parseInt(e.target.value, 10))} className="w-full h-1 rounded cursor-pointer accent-[#567C8D] bg-black/40" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-400">
                            <span>USAGE FREQUENCY DENSITY</span>
                            <span className="text-zinc-300">{frequency} SESSIONS/WK</span>
                        </div>
                        <input type="range" min="0" max="50" value={frequency} onChange={(e) => setFrequency(parseInt(e.target.value, 10))} className="w-full h-1 rounded cursor-pointer accent-[#567C8D] bg-black/40" />
                    </div>
                </div>
            </div>

            {/* ✉️ FEATURE 5: RETENTION MITIGATION EMAIL RECOMMENDATION GENERATOR */}
            <div className="space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">{"// AUTOMATED_RETENTION_EMAIL_DISPATCH"}</span>
                <div className="relative">
                    <textarea
                        readOnly
                        value={structuralMailerTemplateText}
                        className="w-full h-24 text-zinc-500 text-[9px] p-2.5 rounded font-mono leading-normal resize-none focus:outline-none select-all bg-black/40 border border-[#567C8D]/20"
                    />
                    <div className="absolute bottom-1 right-2 text-[8px] text-zinc-700 font-bold uppercase select-none">
                        Click to Copy Payload Template
                    </div>
                </div>
            </div>

            {/* Mitigation Playbook Output Cards */}
            {playbookRecommendations.length > 0 && (
                <div className="pt-2 space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">{"// MITIGATION_PLAYBOOK_RECOMMENDATIONS"}</span>
                    <div className="space-y-2">
                        {playbookRecommendations.map((rec, i) => (
                            <div key={i} className="rounded p-2.5 space-y-0.5 border border-[#567C8D]/20 bg-[#567C8D]/10">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-zinc-200">{rec.title}</span>
                                    <span className="text-zinc-500 text-[9px] uppercase">[{rec.type}]</span>
                                </div>
                                <p className="text-[10px] text-zinc-400 leading-normal">{rec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* System Technical Footprint Parameters metadata banner */}
            <div className="pt-2 border-t flex justify-between text-[9px] text-zinc-500 select-none border-[#567C8D]/20">
                <span>EXPECTED BASE VALUE: {(shapData.base_value || 0).toFixed(3)}</span>
                <span>ENGINE: FASTAPI_V2_SHAP</span>
            </div>

        </div>
    );
}
