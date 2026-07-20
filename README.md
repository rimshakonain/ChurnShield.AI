# CustomerChurn AI (ChurnShield)

> **An AI-powered customer retention platform that transforms customer behavior into actionable business insights through churn prediction, explainable AI, customer segmentation, and intelligent retention recommendations.**

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![License](https://img.shields.io/badge/License-Educational-green)

---

# Overview

CustomerChurn AI (ChurnShield) is a full-stack decision-support platform that helps organizations proactively identify customers at risk of churn and support data-driven retention strategies.

Unlike traditional churn prediction projects that stop at binary classification, ChurnShield integrates predictive analytics, explainability, customer segmentation, recommendation generation, revenue risk estimation, and interactive analytics into a unified web application.

The platform demonstrates a modular, service-oriented architecture where the prediction engine operates independently of the web application. The current implementation validates the complete inference pipeline using a deterministic statistical inference engine, while remaining fully extensible to offline-trained Scikit-learn or XGBoost models.

---

# Features

## Customer Intelligence

- Customer churn prediction
- Churn probability scoring
- Risk classification (Low / Medium / High)
- Customer 360° profile
- Historical prediction timeline
- Revenue risk estimation

## Explainable AI

- SHAP-inspired feature explanations
- Local feature contribution visualization
- Interactive explanation drawer

## Customer Segmentation

- K-Means clustering
- Behavioral customer grouping
- Segment-based business insights

## Recommendation Engine

- Personalized retention strategies
- Telecom-oriented recommendation playbooks
- Decision-support recommendations

## Analytics Dashboard

- Executive KPI dashboard
- Revenue at risk
- Customer overview
- Prediction history
- Threat distribution
- Interactive analytics

## Data Processing

- CSV upload
- Batch prediction
- Concurrent processing
- Automatic customer upsert
- Prediction logging

## System Resilience

- Retry backoff mechanism
- Offline fallback scoring
- Defensive validation
- Enum normalization

---

# Architecture

```text
                    CustomerChurn AI Platform

                 Next.js 16 Frontend Dashboard
                            │
                     Server Actions
                            │
                       Prisma ORM
                            │
                FastAPI Inference Service
                            │
        ┌──────────────────────────────────────┐
        │ Deterministic Statistical Engine     │
        │ Churn Prediction                     │
        │ SHAP Explainability                  │
        │ K-Means Segmentation                 │
        │ Recommendation Engine                │
        └──────────────────────────────────────┘
                            │
                      SQLite Database
```

---

# Technology Stack

## Frontend

- Next.js 16
- React
- Tailwind CSS

## Backend

- FastAPI
- Python
- Prisma ORM

## Database

- SQLite

## Machine Learning

- Deterministic Statistical Inference Engine
- Logistic Probability Mapping
- SHAP-based Explainability
- K-Means Segmentation

## Visualization

- Chart.js
- Custom Dashboard Components

---

# Project Structure

```text
CustomerChurnAI/
│
├── app/
│   ├── actions/
│   ├── dashboard/
│   └── api/
│
├── components/
│
├── lib/
│
├── prisma/
│
├── python/
│   └── main.py
│
├── public/
│
└── README.md
```

---

# Core Modules

- Dashboard & Executive Analytics
- Customer Management
- Prediction Engine
- Explainable AI
- Customer Segmentation
- Recommendation Engine
- Revenue Risk Analysis
- Batch Prediction Pipeline
- Prediction History
- Data Upload Pipeline

---

# Workflow

1. Upload or select customer data.
2. Next.js Server Actions validate incoming requests.
3. Customer records are stored using Prisma ORM.
4. The FastAPI inference service evaluates customer behavior.
5. Churn probability is calculated.
6. Feature contributions are generated for explainability.
7. Customers are segmented using K-Means clustering.
8. Personalized retention recommendations are generated.
9. Results are stored and visualized on the analytics dashboard.

---

# Running Locally

## Clone the repository

```bash
git clone https://github.com/rimshakonain/CustomerChurnAI.git
cd CustomerChurnAI
```

## Install dependencies

```bash
npm install
```

## Start the Next.js application

```bash
npm run dev
```

## Start the FastAPI service

```bash
cd python
uvicorn main:app --reload
```

Open your browser:

```text
http://localhost:3000
```

---

# Future Enhancements

- Offline-trained Scikit-learn models
- XGBoost integration
- PostgreSQL migration
- JWT Authentication
- Role-Based Access Control (RBAC)
- Model Registry
- Automated model retraining
- Docker deployment
- Email notification service
- Cloud deployment

---

# Design Principles

- Modular Architecture
- Service-Oriented Design
- Separation of Concerns
- Explainable AI
- Fault Tolerance
- Extensible Infrastructure

---

# Disclaimer

This project demonstrates an end-to-end AI-enabled customer retention platform. The current implementation validates the production inference pipeline using a deterministic statistical inference engine. The architecture is intentionally designed so that an offline-trained Scikit-learn or XGBoost model can replace the current inference engine without requiring changes to the surrounding application infrastructure.

---

# Author

**Rimsha Konain C**

B.E. Computer Science & Engineering  
SRM Easwari Engineering College

GitHub: **https://github.com/rimshakonain**

---

# License

This project is intended for educational and research purposes.