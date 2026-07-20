"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { verifyRole } from "./auth";

// --- CUSTOMER CRUD OPERATIONS WITH RBAC ENFORCEMENT ---

export async function createCustomer(formData) {
  const isAdmin = await verifyRole("ADMIN");
  if (!isAdmin) return { success: false, error: "UNAUTHORIZED_ACCESS_LEVEL" };

  try {
    const node = await prisma.customer.create({
      data: {
        accountNode: formData.accountNode,
        industry: formData.industry,
        monthlySpending: parseFloat(formData.monthlySpending),
        inactivityDays: parseInt(formData.inactivityDays, 10),
        complaintCount: parseInt(formData.complaintCount, 10),
        usageFrequency: parseInt(formData.usageFrequency, 10)
      }
    });
    revalidatePath("/dashboard");
    return { success: true, data: node };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCustomer(id) {
  const isAdmin = await verifyRole("ADMIN");
  if (!isAdmin) return { success: false, error: "UNAUTHORIZED_ACCESS_LEVEL" };

  await prisma.customer.delete({ where: { id } });
  revalidatePath("/dashboard");
  return { success: true };
}

// --- CLV & FINANCIAL REVENUE LOSS RISK ANALYSIS ENGINE ---

export async function calculateRevenueRiskMetrics() {
  const customers = await prisma.customer.findMany({
    include: { predictions: { orderBy: { calculatedAt: "desc" }, take: 1 } }
  });

  let totalPortfolioValue = 0;
  let estimatedRevenueLoss = 0;

  customers.forEach((c) => {
    const spending = parseFloat(c.monthlySpending);
    totalPortfolioValue += spending;

    // Fetch the latest machine learning churn probability score
    const latestPrediction = c.predictions[0];
    if (latestPrediction) {
      // Financial Damage Exposure = Contract Value * Churn Probability Force
      estimatedRevenueLoss += spending * latestPrediction.churnProbability;
    } else if (c.complaintCount > 3) {
      // Fallback heuristics block for uncalculated accounts
      estimatedRevenueLoss += spending * 0.50;
    }
  });

  return {
    totalPortfolioValue: totalPortfolioValue.toFixed(2),
    estimatedRevenueLoss: estimatedRevenueLoss.toFixed(2),
    netSecureRevenue: (totalPortfolioValue - estimatedRevenueLoss).toFixed(2)
  };
}
