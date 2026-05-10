# Traveloop 🌍✈️

Traveloop is a **full-stack intelligent travel planning platform** built for the **Odoo x KAHE Hackathon**.

It solves the problem of fragmented travel planning by bringing itinerary planning, city discovery, activity exploration, budgeting, packing management, and trip sharing into a single unified platform.

---

## Problem Statement

Travel planning today is highly fragmented:

* Itinerary planning happens in one app
* Budget tracking happens in another
* Destination discovery happens through blogs/videos
* Packing lists are managed manually
* Trip sharing happens through messaging platforms

This creates poor planning efficiency and an inconsistent user experience.

---

## Our Solution

Traveloop centralizes the entire travel planning workflow into one platform where users can:

✅ Create trips
✅ Build personalized itineraries
✅ Explore cities
✅ Discover activities
✅ Track budgets
✅ Manage packing lists
✅ Share trips publicly
✅ View travel analytics

---

# Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Password hashing using bcrypt
* Protected routes

---

## ✈️ Trip Management

* Create trips
* Edit trips
* Delete trips
* View trip history

---

## 🗺️ Itinerary Builder

* Add multiple trip stops
* Organize travel destinations
* Day-wise itinerary planning

---

## 🌆 City Explorer

* Search destinations
* Explore cities
* View recommendations

---

## 🎯 Activities Explorer

* Discover local activities
* Category-based activity planning

---

## 💰 Budget Planner

* Expense tracking
* Category budgeting
* Spending analytics

---

## 🎒 Packing List

* Add packing items
* Mark items packed/unpacked

---

## 🔗 Public Trip Sharing

* Generate shareable links
* Public itinerary viewing

---

## 📊 Dashboard Analytics

* Total trips
* Upcoming trips
* Budget insights
* Travel analytics

---

# Tech Stack

## Frontend

* React
* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Recharts

---

## Backend

* Node.js
* Express.js
* TypeScript

---

## Database

* PostgreSQL
* Prisma ORM

---

## Security

* JWT Authentication
* bcrypt password hashing
* Protected API routes

---

# System Architecture

Frontend
⬇
API Layer
⬇
Express Backend
⬇
Prisma ORM
⬇
PostgreSQL Database

---

# Project Structure

```bash
Odoo-x-KAHE/
│
├── app/
├── components/
├── lib/
├── public/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── README.md
└── LICENSE
```

---

# Database Schema

## Users

* id
* name
* email
* password_hash
* role
* created_at

---

## Profiles

* id
* user_id
* avatar
* preferences

---

## Trips

* id
* user_id
* title
* destination
* start_date
* end_date
* budget
* visibility

---

## Trip Stops

* id
* trip_id
* city_id
* day_number
* notes

---

## Cities

* id
* name
* country
* description
* image_url

---

## Activities

* id
* city_id
* title
* category
* price
* rating

---

## Budgets

* id
* trip_id
* category
* amount
* spent_amount

---

## Packing Items

* id
* trip_id
* item_name
* completed

---

## Shared Trips

* id
* trip_id
* slug
* created_at

---

# API Endpoints

## Authentication

```bash
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

---

## Trips

```bash
GET /api/trips
POST /api/trips
PUT /api/trips/:id
DELETE /api/trips/:id
```

---

## Itinerary

```bash
GET /api/trip-stops
POST /api/trip-stops
PUT /api/trip-stops/:id
DELETE /api/trip-stops/:id
```

---

## Cities

```bash
GET /api/cities
GET /api/cities/:id
```

---

## Activities

```bash
GET /api/activities
POST /api/activities
```

---

## Budget

```bash
GET /api/budgets
POST /api/budgets
PUT /api/budgets/:id
DELETE /api/budgets/:id
```

---

## Packing

```bash
GET /api/packing
POST /api/packing
PUT /api/packing/:id
DELETE /api/packing/:id
```

---

## Trip Sharing

```bash
POST /api/share
GET /api/share/:slug
```

---

## Dashboard Analytics

```bash
GET /api/dashboard/stats
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/barkathnisha27/Odoo-x-KAHE.git
cd Odoo-x-KAHE
```

---

## Frontend Setup

```bash
npm install
npm run dev
```

---

## Backend Setup

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

---

## Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

---

## Seed Demo Data

```bash
npm run seed
```

---

## Start Backend Server

```bash
npm run dev
```

---

# Why Traveloop Stands Out

✅ Full-stack architecture
✅ Relational database design
✅ Real-world travel use case
✅ Secure authentication
✅ Scalable backend
✅ Clean frontend UI
✅ API-driven architecture
✅ Odoo evaluation aligned

---

# Future Enhancements

* AI-based travel recommendations
* Flight booking integration
* Hotel booking integration
* Weather forecasting
* Collaborative trip planning

---

# Team

Built for **Odoo x KAHE Hackathon**

Team Members:

* Nisha
* Shareng
* Sidmal Madhan 
* Ranjith
---
