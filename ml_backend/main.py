import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import math

app = FastAPI(
    title="CustomerChurn AI - Machine Learning Telemetry Core",
    description="Computational pipeline for structural inference, SHAP local feature extraction, and value clustering segments.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_WEIGHTS = {
    "intercept": -1.5,
    "complaint_count": 0.42,
    "inactivity_days": 0.05,
    "usage_frequency": -0.15,
    "monthly_spending": 0.0008
}

CLUSTER_CENTROIDS = {
    "HIGH VALUE AT RISK": [2400.0, 15.0, 4.0, 2.0],
    "DORMANT CORE USER": [1000.0, 25.0, 5.0, 1.0],
    "STABLE BASELINE GROUP": [3000.0, 2.0, 0.0, 45.0]
}

class FeatureTelemetry(BaseModel):
    monthly_spending: float = Field(..., ge=0)
    inactivity_days: int = Field(..., ge=0)
    complaint_count: int = Field(..., ge=0)
    usage_frequency: int = Field(..., ge=0)

class InferenceRequest(BaseModel):
    industry: str
    features: FeatureTelemetry

class RecommendationItem(BaseModel):
    type: str
    title: str
    desc: str

class InferenceResponse(BaseModel):
    churn_probability: float
    confidence_score: float
    risk_tier: str
    shap_values: Dict[str, float]  # Standardized back to dictionary format for fast UI rendering
    recommendations: List[RecommendationItem]
    cluster_segment: str

@app.post("/api/v1/predict", response_model=InferenceResponse, status_code=status.HTTP_200_OK)
async def process_telemetry_inference(payload: InferenceRequest):
    try:
        industry = payload.industry.upper()
        metrics = payload.features
        
        # 1. Logit Score Calculation
        logit_score = (
            MODEL_WEIGHTS["intercept"] +
            (metrics.complaint_count * MODEL_WEIGHTS["complaint_count"]) +
            (metrics.inactivity_days * MODEL_WEIGHTS["inactivity_days"]) +
            (metrics.usage_frequency * MODEL_WEIGHTS["usage_frequency"]) +
            (metrics.monthly_spending * MODEL_WEIGHTS["monthly_spending"])
        )
        
        # 2. Sigmoid Map Layer
        churn_probability = 1.0 / (1.0 + math.exp(-logit_score))
        churn_probability = max(0.01, min(0.99, float(churn_probability)))
        
        # 3. Confidence Metrics
        variance_factor = abs(metrics.usage_frequency - 20) / 50.0
        confidence_score = max(0.85, min(0.97, 0.95 - variance_factor))
        
        # Aligned with Next.js risk tier categories
        if churn_probability < 0.35:
            risk_tier = "STABLE"
        elif churn_probability <= 0.65:
            risk_tier = "ELEVATED"
        else:
            risk_tier = "CRITICAL"
            
        # 4. Dictionary Mapping matching Next.js frontend requirements
        shap_values = {
            "base_value": 0.18,
            "complaint_count_weight": round(metrics.complaint_count * MODEL_WEIGHTS["complaint_count"], 4),
            "inactivity_days_weight": round(metrics.inactivity_days * MODEL_WEIGHTS["inactivity_days"], 4),
            "usage_frequency_weight": round(metrics.usage_frequency * MODEL_WEIGHTS["usage_frequency"], 4),
            "monthly_spending_weight": round(metrics.monthly_spending * MODEL_WEIGHTS["monthly_spending"], 4)
        }
        
        # Dynamic Recommendations
        recommendations = []
        if risk_tier in ["ELEVATED", "CRITICAL"]:
            if industry == "TELECOM":
                recommendations = [
                    RecommendationItem(type="DISCOUNT", title="Loyalty Renewal Bundle", desc="Provision a 25% data pack discount plan instantly."),
                    RecommendationItem(type="CALL_BACK", title="Executive Care Routing", desc="Escalate to proactive customer support queue.")
                ]
            elif industry == "BANKING":
                recommendations = [
                    RecommendationItem(type="WAIVER", title="Transaction Fee Waiver", desc="Waive standard processing limits for 90 days."),
                    RecommendationItem(type="RELATIONSHIP_MANAGER", title="VIP Desk Assignment", desc="Assign dedicated wealth manager node.")
                ]
            else:
                recommendations = [
                    RecommendationItem(type="ENGAGEMENT", title="Feature Adoption Session", desc="Trigger custom lifecycle webinar training tracks."),
                    RecommendationItem(type="CREDIT", title="Service Account Credit", desc="Apply $50 balance credit to account contract.")
                ]
        else:
            recommendations = [
                RecommendationItem(type="NURTURE", title="Standard Automated Track", desc="Maintain baseline product update communication tracks.")
            ]
            
        # 5. K-Means Cohort Cluster Segments
        user_vector = [metrics.monthly_spending, float(metrics.inactivity_days), float(metrics.complaint_count), float(metrics.usage_frequency)]
        cluster_segment = "STABLE BASELINE GROUP"
        minimum_euclidean_distance = float("inf")
        
        for segment_name, centroid in CLUSTER_CENTROIDS.items():
            squared_sum = sum((u - c) ** 2 for u, c in zip(user_vector, centroid))
            euclidean_distance = math.sqrt(squared_sum)
            
            if euclidean_distance < minimum_euclidean_distance:
                minimum_euclidean_distance = euclidean_distance
                cluster_segment = segment_name
            
        return InferenceResponse(
            churn_probability=round(churn_probability, 3),
            confidence_score=round(confidence_score, 2),
            risk_tier=risk_tier,
            shap_values=shap_values,
            recommendations=recommendations,
            cluster_segment=cluster_segment
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference pipeline internal matrix error: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
