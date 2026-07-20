# CustomerChurn AI (ChurnShield)

> AI-powered customer retention platform that transforms customer behavior into actionable business insights through churn prediction, explainable AI, customer segmentation, and intelligent retention recommendations.

---

## Overview

CustomerChurn AI (ChurnShield) is a full-stack decision-support platform designed to help organizations proactively identify customers at risk of churn and assist business teams in making data-driven retention decisions.

Unlike traditional churn prediction projects that stop at predicting whether a customer will leave, ChurnShield integrates predictive analytics, explainability, customer segmentation, recommendation generation, revenue impact estimation, and interactive dashboards into a unified web application.

The current implementation demonstrates the complete end-to-end inference pipeline using a deterministic statistical scoring model. The architecture is designed so that the scoring engine can be replaced with an offline-trained Scikit-learn or XGBoost model without changing the frontend or backend integration.

---

## Key Features

### Customer Intelligence

- Customer churn prediction
- Risk classification (Low / Medium / High)
- Customer 360° profile
- Historical prediction timeline
- Customer segmentation
- Revenue risk estimation

### Explainable AI

- SHAP-based feature explanations
- Local feature contribution visualization
- Interactive explanation drawer

### Recommendation Engine

- Personalized retention strategies
- Telecom-oriented recommendation playbooks
- Business decision support

### Analytics Dashboard

- Executive KPI dashboard
- Revenue at risk
- Customer overview
- Prediction history
- Threat distribution
- Interactive analytics

### Data Processing

- CSV upload
- Batch prediction
- Concurrent processing
- Automatic customer upsert
- Prediction logging

### System Resilience

- Retry backoff mechanism
- Offline fallback scoring
- Defensive validation
- Enum normalization

---

# Architecture

```

                    CustomerChurn AI Platform

```
              Next.js 16 (Frontend Dashboard)
                          │
                  Server Actions
                          │
                    Prisma ORM
                          │
                 FastAPI Inference Service
                          │
      ┌─────────────────────────────────────┐
      │ Statistical Scoring Engine          │
      │ SHAP Explainability                 │
      │ Customer Segmentation               │
      │ Recommendation Engine               │
      └─────────────────────────────────────┘
                          │
                     SQLite Database

```

---

## Technology Stack

### Frontend

- Next.js 16
- React
- Tailwind CSS

### Backend

- FastAPI
- Python
- Prisma ORM

### Database

- SQLite

### Machine Learning

- Statistical Inference Pipeline
- Logistic Probability Mapping
- SHAP Explainability
- K-Means Segmentation

### Visualization

- Chart.js
- Custom Analytics Components

---

## Project Structure

```

app/
dashboard/
actions/

components/

lib/

prisma/

python/
FastAPI Service

```

---

## Core Modules

- Dashboard & Executive Analytics
- Customer Management
- Prediction Engine
- Explainable AI
- Customer Segmentation
- Recommendation Engine
- Revenue Analysis
- Batch Processing
- Prediction History
- Data Upload Pipeline

---

## How It Works

1. Customer data is uploaded or selected.
2. The frontend invokes secure Next.js Server Actions.
3. Data is validated and stored using Prisma.
4. The FastAPI inference service evaluates customer behavior.
5. Churn probability is calculated.
6. SHAP explains the prediction.
7. Customer segmentation is performed.
8. Personalized recommendations are generated.
9. Results are persisted and displayed on the analytics dashboard.

---

## Running Locally

### Clone the repository

```bash
git clone https://github.com/<your-username>/CustomerChurnAI.git

cd CustomerChurnAI
```

### Install dependencies

```bash
npm install
```

### Start the Next.js application

```bash
npm run dev
```

### Start the FastAPI service

```bash
cd python

uvicorn main:app --reload
```

Open

```
http://localhost:3000
```

---

## Future Enhancements

- Offline-trained Scikit-learn/XGBoost models
- PostgreSQL migration
- JWT Authentication
- Role-Based Access Control (RBAC)
- Model Registry
- Automated retraining pipeline
- Docker deployment
- Email notification service

---

## Design Principles

- Modular Architecture
- Service-Oriented Design
- Separation of Concerns
- Explainable AI
- Fault Tolerance
- Extensible Infrastructure

---

## Disclaimer

This project demonstrates an end-to-end AI-enabled customer retention platform. The current implementation uses a deterministic statistical inference engine to validate the production inference pipeline. The architecture is intentionally designed so that trained machine learning models can be integrated without modifying the surrounding application infrastructure.

---

## Author

**Rimsha Konain C**

Computer Science & Engineering

SRM Easwari Engineering College

GitHub: https://github.com/rimshakonain

---

## License

This project is intended for educational and research purposes.