import { prisma } from "../../../lib/prisma";
import ShapDrawer from "../../components/ShapDrawer"; // Accurate relative folder hop reference

export default async function PredictionsPage() {
  // Fetch prediction records along with parent company info from local data storage
  const predictions = await prisma.prediction.findMany({
    include: { customer: true },
    orderBy: { calculatedAt: "desc" }
  }) || [];

  // Define corporate style mappings directly matching our 5-color enterprise palette
  // Outer interior containers usually live within the global theme background set on layout blocks
  const corporateFontFamily = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

  return (
    <div className="space-y-6 w-full" style={corporateFontFamily}>
      
      {/* 1. ACADEMICALLY DEFENSIVE TITLE HEADER */}
      <div className="border-b border-[#567C8D]/20 pb-4">
        <h2 className="text-sm font-bold tracking-tight text-[#C8D9E6] uppercase">
          Historical Prediction Records
        </h2>
        <p className="text-xs text-[#F5EFEB]/70 mt-0.5">Historical sequence log of active machine learning model inferences</p>
      </div>

      {predictions.length === 0 ? (
        /* Empty Database State View Block */
        <div className="border border-dashed border-[#567C8D]/30 rounded-md p-12 text-center text-xs font-bold uppercase tracking-wider text-[#C8D9E6]/60 bg-[#567C8D]/10">
          No Active Inference Records Detected. Navigate to the execution console hub to parse data.
        </div>
      ) : (
        /* 2. FULL-WIDTH ENTERPRISE INFERENCE LOG DATA MATRIX */
        <div className="border border-[#567C8D]/20 rounded-md p-5 bg-[#2F4156]">
          <div className="overflow-x-auto text-xs font-medium">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#567C8D]/30 text-[#C8D9E6] font-bold tracking-wide">
                  <th className="pb-3 pl-2">Timestamp Log</th>
                  <th className="pb-3">Account Record Name</th>
                  <th className="pb-3">Churn Probability</th>
                  <th className="pb-3">Risk Stratification Tier</th>
                  <th className="pb-3 text-right pr-2">Feature Attribution Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#567C8D]/20 text-[#F5EFEB]/90">
                {predictions.map((log) => {
                  const probabilityPercent = (log.churnProbability * 100).toFixed(2);
                  const normalizedTier = String(log.riskClassification || "").toUpperCase();

                  return (
                    <tr key={log.id} className="hover:bg-[#567C8D]/10 transition-colors">
                      <td className="py-3.5 pl-2 text-[#C8D9E6]/80 font-normal">
                        {new Date(log.calculatedAt).toISOString().replace("T", " ").substring(0, 19)}
                      </td>
                      <td className="py-3.5 font-bold text-white">
                        {log.customer?.accountNode || "Unknown Node"}
                      </td>
                      <td className="py-3.5 text-[#C8D9E6]">
                        {probabilityPercent}%
                      </td>
                      <td className="py-3.5">
                        {/* Status badge nodes utilizing palette weights */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          normalizedTier === "HIGH" || normalizedTier === "CRITICAL"
                            ? "bg-rose-500/10 text-rose-300 border-rose-500/20" 
                            : normalizedTier === "MEDIUM" || normalizedTier === "ELEVATED"
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
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
