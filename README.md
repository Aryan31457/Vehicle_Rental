# Vehicle Rental System

A modern vehicle rental platform built with Next.js and Go.

## Project Structure
```
.
├── frontend/           # Next.js frontend application
└── backend/           # Go backend application
```

## Technology Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- Axios

### Backend
- Go 1.21+
- Gin Web Framework
- GORM
- PostgreSQL
- JWT Authentication
- WebSocket

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.21+
- PostgreSQL 14+

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod tidy
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Run the server:
```bash
go run main.go
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Features
- User Authentication (Login/Signup)
- Vehicle Management
- Branch Management
- Real-time Availability
- Booking System
- Admin Dashboard
- Vehicle Tracking
- Membership/Subscription
- Notifications System 
