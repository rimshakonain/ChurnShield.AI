import { prisma } from "../../../lib/prisma";
import ShapDrawer from "../../components/ShapDrawer"; // Accurate relative folder hop reference

export default async function PredictionsPage() {
  // Fetch prediction records along with parent company info from local file storage
  const predictions = await prisma.prediction.findMany({
    include: { customer: true },
    orderBy: { calculatedAt: "desc" }
  }) || [];

  return (
    <div className="space-y-6">
      
      {/* Structural Title Header */}
      <div className="border-b border-zinc-900 pb-4">
        <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">
          {"// RISK_STRATIFICATION_LOGS"}
        </h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">Historical sequence log of raw machine learning calculations</p>
      </div>

      {predictions.length === 0 ? (
        <div className="border border-dashed border-zinc-900 rounded-xl p-12 text-center text-xs font-mono uppercase tracking-wider text-zinc-600">
          {"// NO ACTIVE INFERENCE TELEMETRY STORED // NAVIGATE TO CONSOLE HUB AND EXECUTE SCORE NODE"}
        </div>
      ) : (
        <div className="border border-zinc-900 rounded-xl p-5 bg-zinc-900/5">
          <div className="overflow-x-auto text-[11px] font-mono uppercase">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 font-semibold tracking-wider">
                  <th className="pb-2 pl-2">TIMESTAMP LOG</th>
                  <th className="pb-2">ACCOUNT NODE</th>
                  <th className="pb-2">CHURN PROBABILITY</th>
                  <th className="pb-2">RISK CLASSIFICATION</th>
                  <th className="pb-2 text-right pr-2">EXPLANATORY FORCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50 text-zinc-300">
                {predictions.map((log) => {
                  const probabilityPercent = (log.churnProbability * 100).toFixed(2);
                  const normalizedTier = String(log.riskClassification || "").toUpperCase();

                  return (
                    <tr key={log.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="py-3.5 pl-2 text-zinc-500">
                        {new Date(log.calculatedAt).toISOString().replace("T", " ").substring(0, 19)}
                      </td>
                      <td className="py-3.5 font-bold text-zinc-100">
                        {log.customer?.accountNode || "UNKNOWN_NODE"}
                      </td>
                      <td className="py-3.5 text-zinc-400">
                        {probabilityPercent}%
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          normalizedTier === "HIGH" || normalizedTier === "CRITICAL"
                            ? "bg-rose-500/5 text-rose-400 border-rose-500/20" 
                            : normalizedTier === "MEDIUM" || normalizedTier === "ELEVATED"
                            ? "bg-amber-500/5 text-amber-400 border-amber-500/20"
                            : "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                        }`}>
                          {normalizedTier}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        {/* Mount the interactive SHAP local factor drawer item */}
                        <ShapDrawer shapData={log.shapExplanations} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
