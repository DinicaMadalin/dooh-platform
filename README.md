# DOOH Campaign Play Processor

A full-stack Digital Out-of-Home (DOOH) platform that simulates real-time ad play event processing. The system receives play events from digital screens, queues them asynchronously, and displays aggregated campaign performance in a live dashboard.

## 🎯 Demo & Features

### Core Features
✅ **POST /events** - Accepts play events and queues them for processing  
✅ **Background Worker** - Processes queued events asynchronously every few seconds  
✅ **GET /campaigns** - Returns all campaigns with aggregated play counts  
✅ **Live Dashboard** - Real-time display of campaign statistics  
✅ **Event Simulator** - Button to generate random play events  
✅ **Auto-refresh** - Dashboard updates automatically every few seconds  

### Bonus Features Implemented
✅ **PostgreSQL Storage** - Persistent event storage in Supabase  
✅ **Redis Queue** - Reliable message queue with Upstash  
✅ **Bar Chart Visualization** - Visual representation of play counts  
✅ **Per-Screen Breakdown** - Detailed impressions by screen ID  
✅ **Pause/Resume Processing** - Toggle to control worker processing  
⚠️ **Deployment** - Not completed (see improvements section)

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **shadcn/ui** - UI components

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Node.js Worker** - Background job processor
- **PostgreSQL** (Supabase) - Event and campaign storage
- **Redis** (Upstash) - Message queue and cache

### Infrastructure
- **Vercel** (ready for deployment)
- **Supabase** - Database hosting
- **Upstash** - Redis hosting

## 🏗 Architecture Overview

```
┌─────────────┐
│   Browser   │
│  Dashboard  │
└──────┬──────┘
       │ GET /campaigns (auto-refresh)
       | GET /screens (auto-refresh)
       │ POST /events (simulate)
       ▼
┌─────────────────────────────────────┐
│        Next.js API Routes           │
│  ┌────────────┐    ┌─────────────┐  │
│  │POST /events│───▶│ Redis Queue│  │
│  └────────────┘    └─────────────┘  │
│                          │          │
│  ┌────────────┐          │          │
│  │GET         |          |          |
|  | /campaigns |          |          |
|  │ /screens   │          │          |
│  │            │◀────────┼─────┐    │
│  └────────────┘          │     │    │
└──────────────────────────┼─────┼────┘
                           │     │
                           ▼     │
                    ┌──────────┐ │
                    │  Worker  │ │
                    │ Process  │ │
                    └────┬─────┘ │
                         │       │
                         ▼       ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Supabase)    │
                    │                 │
                    │ - events table  │
                    │ - campaigns     │
                    │ - play_stats    │
                    └─────────────────┘
```

### Data Flow

1. **Event Ingestion**: POST /events receives play event → pushes to Redis queue
2. **Async Processing**: Worker polls Redis queue → processes batch of events → updates PostgreSQL
3. **Dashboard Display**: Frontend polls GET /campaigns → displays aggregated stats with auto-refresh

## 📦 Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier works)
- Upstash Redis account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/DinicaMadalin/dooh-platform.git
cd dooh-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env.local` in the root directory:

```env
# Supabase Configuration
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

### 4. Database Setup

**Option - Terminal (psql):**
```bash
psql "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
# then query(SELECT * FROM <TABLE>)
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### 6. Start Background Worker

In a **separate terminal**:

```bash
npm run dev:worker
```

The worker will start processing events from the Redis queue every 3 seconds.

### 7. Using the Application

1. Open http://localhost:3000 in your browser
2. Click **"Simulate Event"** to generate random play events
3. Watch the dashboard auto-refresh and update play counts
4. Use **"Pause/Resume Processing"** to control the worker
5. View the bar chart visualization and per-screen breakdown


## ⏱ Time Spent

| Phase | Tasks | Actual Time |
|-------|-------|-------------|
| **Planning** | Architecture design, tech stack research | 30 min |
| **Project Setup** | Next.js init, dependencies, environment | 20 min |
| **Database Schema** | Supabase setup, table design, test data | 40 min |
| **API Endpoints** | API's setup validation | 1h 15min |
| **Redis Integration** | Upstash setup, queue operations | 30 min |
| **Worker Process** | Background job processor | 1h 00min |
| **Frontend UI** | Dashboard layout, components, styling | 1h 30min |
| **Data Visualization** | Recharts integration, bar chart | 45 min |
| **Bonus Features** | Per-screen breakdown, pause/resume | 45 min |
| **Testing & Debugging** | Bug fixes, edge cases, refinement | 1h 00min |
| **Documentation** | README, code comments, setup guide | 45 min |
| **Total** | | **~8 hours** |

**Note**: Exceeded the suggested 4 hours to implement bonus features (database storage, charts, per-screen stats, pause/resume). Core functionality alone would fit in ~4-5 hours.

## 🚀 Potential Improvements


1. **Deployment** ⚠️
   - Deploy frontend to Vercel
   - Deploy worker as Vercel Cron Job or separate service (Railway, Render)
   - Configure production environment variables
   - Add health check endpoints

2. **Error Handling**
   - Add retry logic for failed events
   - Dead letter queue for permanently failed events
   - Better error messages in UI
   - Sentry integration for error tracking

3. **Testing**
   - Unit tests for queue operations
   - Integration tests for API endpoints
   - Worker process tests with mock Redis
